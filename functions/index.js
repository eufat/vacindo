/* eslint-disable comma-dangle, dot-notation, prefer-destructuring, no-plusplus */

const functions = require('firebase-functions');
const _ = require('lodash');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp(functions.config().firebase);

const algolia = algoliasearch('5RPGT77LXQ', 'c0c34193afd1631b2024fcf24699863a');

const userIndex = algolia.initIndex('users');

function getDate(millis) {
  let today = new Date();

  if (millis) {
    today = new Date(millis);
  }
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${dd}-${mm}-${yyyy}`;
}

exports.actions = functions.https.onRequest((req, res) => {
  req.get('/export-users-data', (request, respond) => {
    const database = admin.database();
    return database.ref('/usersData').once('value', (users) => {
      const records = [];
      users.forEach((user) => {
        const childKey = user.key;
        const childData = user.val();
        childData.objectID = childKey;
        records.push(childData);
      });

      userIndex
        .saveObjects(records)
        .then(() => {
          const message = 'imported into Algolia';
          console.log(message);
          respond.send(message);
        })
        .catch((error) => {
          const message = 'Error when importing into Algolia';
          console.error(message, error);
          respond.send(message);
        });
    });
  });

  req.get('/reset-counter', (request, respond) => {
    const database = admin.database();

    database
      .ref('/')
      .once('value')
      .then((snapshot) => {
        const parsed = snapshot.val();

        // Reset count values
        parsed.appData.examsCount = _.mapValues(parsed.appData.examsCount, (v, k, o) => 0);
        parsed.appData.methodsCount = _.mapValues(parsed.appData.methodsCount, (v, k, o) => 0);

        function updateNumber(data, dataFieldKey, dataNumberingKey, callback) {
          let i = 1;
          parsed.appData.verificationCount = 0;

          const updatedData = _.mapValues(data[dataFieldKey], (value, key, object) => {
            const newValue = value;
            newValue[dataNumberingKey] = i;

            if (newValue.examType) {
              const previousExamsCount = parsed.appData.examsCount[newValue.examType];
              parsed.appData.examsCount[newValue.examType] = previousExamsCount + 1;
            }

            if (newValue.method) {
              const previousMethodsCount = parsed.appData.methodsCount[newValue.method];
              parsed.appData.methodsCount[newValue.method] = previousMethodsCount + 1;
            }

            if (newValue.verificationTime > 0) {
              const previousVerificationCount = parsed.appData.verificationCount;
              parsed.appData.verificationCount = previousVerificationCount + 1;
            }

            i++;
            return newValue;
          });

          callback(i - 1);
          return updatedData;
        }

        parsed.paymentsData = updateNumber(
          parsed,
          'paymentsData',
          'paymentNumber',
          i => (parsed.appData.paymentsCount = i),
        );
        parsed.usersData = updateNumber(
          parsed,
          'usersData',
          'userNumber',
          i => (parsed.appData.usersCount = i),
        );

        database.ref('/').update(parsed, () => respond.send('Reset successfull'));
      });
  });
});

function addOrUpdateUserRecord(user) {
  return new Promise((resolve, reject) => {
    const record = user.val();
    record.objectID = user.key;
    userIndex
      .saveObject(record)
      .then(() => {
        console.log('User userIndexed in Algolia', record.objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when userIndexing user into Algolia', error);
        reject();
      });
  });
}

function deleteUserRecord(user) {
  return new Promise((resolve, reject) => {
    const objectID = user.key;
    userIndex
      .deleteObject(objectID)
      .then(() => {
        console.log('User deleted from Algolia', objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when deleting user from Algolia', error);
        reject();
      });
  });
}

exports.updateUsersData = functions.database
  .ref('/usersData/{userId}')
  .onUpdate(event => addOrUpdateUserRecord(event.data));

exports.updateVerification = functions.database
  .ref('/paymentsData/{paymentId}/verificationTime')
  .onCreate(() => {
    const verificationCountRef = admin.database().ref('appData/verificationCount');
    verificationCountRef.once('value').then(() => {
      verificationCountRef.transaction((current) => {
        const count = (current || 0) + 1;
        return count;
      });
    });

    return verificationCountRef;
  });

exports.createPayment = functions.database.ref('/paymentsData/{paymentId}').onCreate((event) => {
  const now = new Date();
  const timestamp = now.getTime();

  const updatePaymentNumber = new Promise((resolve, reject) => {
    const paymentsCountRef = admin.database().ref('appData/paymentsCount');
    paymentsCountRef.once('value').then(() => {
      let count = null;
      paymentsCountRef.transaction(
        (current) => {
          count = (current || 0) + 1;
          return count;
        },
        (error, committed, snapshot) => {
          const value = snapshot.val();
          const userRef = admin.database().ref(`paymentsData/${event.params.paymentId}`);
          userRef.update({ paymentNumber: value }).then(() => {
            console.log(`Payment count: ${value}`);
            resolve();
          });
        },
      );
    });
  });

  const verification = event.data.val()['method'];
  const verificationCountRef = admin.database().ref(`appData/methodsCount/${verification}`);
  verificationCountRef.once('value').then(() => {
    verificationCountRef.transaction((current) => {
      const count = (current || 0) + 1;
      return count;
    });
  });

  const dateNow = getDate(timestamp);
  const timelineRef = admin.database().ref(`appData/timeline/${dateNow}`);
  timelineRef.once('value').then(() => {
    timelineRef.transaction((current) => {
      let date = null;
      let payments = null;
      let users = null;

      if (current) {
        date = current.date;
        payments = current.payments;
        users = current.users;
      }

      return { date: date || dateNow, payments: (payments || 0) + 1, users: users || 0 };
    });
  });

  const prevData = event.data.val();
  const voucherCode = prevData.method === 'voucher' ? prevData.data.code : '';
  const verificationTime = voucherCode !== '' ? timestamp : 0;

  const vouchersDataRef = admin.database().ref(`vouchersData/${voucherCode}/paymentId`);
  vouchersDataRef.once('value').then(() => {
    vouchersDataRef.transaction((current) => {
      const newPaymentId = current !== '' ? current : event.params.paymentId;
      console.log(`np: ${newPaymentId}: current: ${current}; paymentId: ${event.params.paymentId}`);
      return newPaymentId;
    });
  });

  const newData = Object.assign({}, prevData, {
    creationTime: timestamp,
    verificationTime,
  });

  return Promise.all([
    timelineRef,
    updatePaymentNumber,
    verificationCountRef,
    vouchersDataRef,
    event.data.ref.parent.child(event.params.paymentId).set(newData),
  ]);
});

exports.createUser = functions.database.ref('/usersData/{userId}').onCreate((event) => {
  const now = new Date();
  const timestamp = now.getTime();

  const updateUserNumber = new Promise((resolve, reject) => {
    const usersCountRef = admin.database().ref('appData/usersCount');
    usersCountRef.once('value').then(() => {
      let count = null;
      usersCountRef.transaction(
        (current) => {
          count = (current || 0) + 1;
          return count;
        },
        (error, committed, snapshot) => {
          const userNumber = snapshot.val();
          const userRef = admin.database().ref(`usersData/${event.params.userId}`);
          userRef.update({ userNumber }).then(() => {
            console.log(`User count: ${userNumber}`);
            resolve();
          });
        },
      );
    });
  });

  const userExamType = event.data.val().examType;
  const usersExamCountRef = admin.database().ref(`appData/examsCount/${userExamType}`);
  usersExamCountRef.once('value').then(() => {
    usersExamCountRef.transaction((current) => {
      const examCount = (current || 0) + 1;
      return examCount;
    });
  });

  const dateNow = getDate(timestamp);
  const timelineRef = admin.database().ref(`appData/timeline/${dateNow}`);
  timelineRef.once('value').then(() => {
    timelineRef.transaction((current) => {
      let date = null;
      let payments = null;
      let users = null;

      if (current) {
        date = current.date;
        payments = current.payments;
        users = current.users;
      }

      return { date: date || dateNow, payments: payments || 0, users: (users || 0) + 1 };
    });
  });

  const lastRegsTimeRef = admin.database().ref('appData/lastRegsTime');
  lastRegsTimeRef.once('value').then(() => {
    lastRegsTimeRef.transaction((current) => {
      const newTimestamp = current || timestamp;
      return newTimestamp;
    });
  });

  const prevData = event.data.val();
  const newData = Object.assign({}, prevData, {
    registeredTime: timestamp,
    lastSigninTime: timestamp,
    paymentId: '',
    attendedTime: 0,
    role: 'user',
  });

  return Promise.all([
    updateUserNumber,
    usersExamCountRef,
    timelineRef,
    lastRegsTimeRef,
    addOrUpdateUserRecord(event.data),
    event.data.ref.parent.child(event.params.userId).set(newData),
  ]);
});

exports.deleteUserData = functions.database
  .ref('usersData/{userId}')
  .onDelete(event =>
    Promise.all([deleteUserRecord(event.data), admin.auth().deleteUser(event.params.userId)]), );

exports.deleteUserAuth = functions.auth.user().onDelete((event) => {
  const user = event.data;

  const deletedUserCountRef = admin.database().ref('appData/deletedUserCount');
  deletedUserCountRef.once('value').then(() => {
    deletedUserCountRef.transaction((current) => {
      const newCount = (current || 0) + 1;
      return newCount;
    });
  });

  const userDataRef = admin.database().ref(`usersData/${user.uid}`);

  return Promise.all([userDataRef.set(null), deletedUserCountRef]);
});
