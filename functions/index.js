/* eslint-disable comma-dangle, dot-notation */

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

  function updatePaymentNumber(paymentId, paymentNumber) {
    const userRef = admin.database().ref(`paymentsData/${paymentId}`);
    userRef.update({ paymentNumber });
  }

  const paymentsCountRef = admin.database().ref('appData/paymentsCount');
  paymentsCountRef.once('value').then(() => {
    let count = null;
    paymentsCountRef.transaction(
      (current) => {
        count = (current || 0) + 1;
        return count;
      },
      (error, committed, snapshot) => {
        updatePaymentNumber(event.params.paymentId, snapshot.val());
      }
    );
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
  const newData = Object.assign({}, prevData, {
    creationTime: timestamp,
    verificationTime: 0,
  });

  return Promise.all([
    timelineRef,
    paymentsCountRef,
    paymentsMethodCountRef,
    event.data.ref.parent.child(event.params.paymentId).set(newData),
  ]);
});

exports.createUser = functions.database.ref('/usersData/{userId}').onCreate((event) => {
  const now = new Date();
  const timestamp = now.getTime();

  function updateUserNumber(userId, userNumber) {
    const userRef = admin.database().ref(`usersData/${userId}`);
    userRef.update({ userNumber });
  }

  const usersCountRef = admin.database().ref('appData/usersCount');
  usersCountRef.once('value').then(() => {
    let count = null;
    usersCountRef.transaction(
      (current) => {
        count = (current || 0) + 1;
        return count;
      },
      (error, committed, snapshot) => {
        updateUserNumber(event.params.userId, snapshot.val());
      }
    );
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
    usersCountRef,
    usersExamCountRef,
    timelineRef,
    lastRegsTimeRef,
    event.data.ref.parent.child(event.params.userId).set(newData),
  ]);
});

exports.deleteUser = functions.auth.user().onDelete((event) => {
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
