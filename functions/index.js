/* eslint-disable comma-dangle, dot-notation, prefer-destructuring */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

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
        }
      );
    });
  });

  const paymentMethod = event.data.val()['method'];
  const paymentsMethodCountRef = admin.database().ref(`appData/methodsCount/${paymentMethod}`);
  paymentsMethodCountRef.once('value').then(() => {
    paymentsMethodCountRef.transaction((current) => {
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
    paymentsMethodCountRef,
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
        }
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
    event.data.ref.parent.child(event.params.userId).set(newData),
  ]);
});

exports.deleteUserData = functions.database.ref('usersData/{userId}').onDelete((event) => {
  return admin.auth().deleteUser(event.params.userId);
});

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
