/* eslint-disable comma-dangle, dot-notation, prefer-destructuring, no-plusplus */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const helpers = require('./helpers');
const algolia = require('./algolia');
const http = require('./http');

admin.initializeApp(functions.config().firebase);

exports.actions = functions.https.onRequest((req, res) => {
  algolia.updateRecords(req, res, admin.database());
  http.updateCounter(req, res, admin.database());
});

exports.updateUsersData = functions.database
  .ref('/usersData/{userId}')
  .onUpdate(event => algolia.addOrUpdateUserRecord(event.data));

exports.updatePaymentsaData = functions.database
  .ref('/paymentsData/{paymentId}')
  .onUpdate(event => algolia.addOrUpdatePaymentRecord(event.data));

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

  const userRef = admin.database().ref(`paymentsData/${event.params.paymentId}`);
  const updatePaymentNumber = admin.database().ref('appData/paymentsCount');
  updatePaymentNumber.once('value').then(() => {
    let count = null;
    updatePaymentNumber
      .transaction((current) => {
        count = (current || 0) + 1;
        return count;
      })
      .then(({ committed, snapshot }) => {
        const paymentNumber = snapshot.val();
        if (committed) {
          userRef.update({ paymentNumber }).then(() => {
            console.log(`Payment count: ${paymentNumber}`);
          });
        } else {
          console.log(`Not committed payment count: ${paymentNumber}`);
        }
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

  const dateNow = helpers.getDate(timestamp);
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
    algolia.addOrUpdatePaymentRecord(event.data),
    event.data.ref.parent.child(event.params.paymentId).set(newData),
  ]);
});

exports.createUser = functions.database.ref('/usersData/{userId}').onCreate((event) => {
  const now = new Date();
  const timestamp = now.getTime();

  const userRef = admin.database().ref(`usersData/${event.params.userId}`);
  const updateUserNumber = admin.database().ref('appData/usersCount');
  updateUserNumber.once('value').then(() => {
    let count = null;
    updateUserNumber
      .transaction((current) => {
        count = (current || 0) + 1;
        return count;
      })
      .then(({ committed, snapshot }) => {
        const userNumber = snapshot.val();
        if (committed) {
          userRef.update({ userNumber }).then(() => {
            console.log(`User count: ${userNumber}`);
          });
        } else {
          console.log(`Not committed user count: ${userNumber}`);
        }
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

  const dateNow = helpers.getDate(timestamp);
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
    algolia.addOrUpdateUserRecord(event.data),
    event.data.ref.parent.child(event.params.userId).set(newData),
  ]);
});

exports.deleteUserData = functions.database
  .ref('usersData/{userId}')
  .onDelete(event =>
    Promise.all([
      algolia.deleteUserRecord(event.data),
      admin.auth().deleteUser(event.params.userId),
    ]));

exports.deletePaymentData = functions.database
  .ref('usersData/{userId}')
  .onDelete(event => Promise.all([algolia.deletePaymentRecord(event.data)]));

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
