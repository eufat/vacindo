import * as firebase from 'firebase';

import { showLoadingBar, successMessage, errorMessage } from '../App/actions';

export async function fetchUserData(userId) {
  if (userId) {
    const userData = await firebase
      .database()
      .ref(`usersData/${userId}`)
      .once('value');
    return userData.val();
  }
  return null;
}

export async function fetchPaymentData(paymentId) {
  if (paymentId) {
    const paymentData = await firebase
      .database()
      .ref(`paymentsData/${paymentId}`)
      .once('value');
    return paymentData.val();
  }
  return null;
}

export async function fetchVoucherData(voucherCode) {
  const voucherData = await firebase
    .database()
    .ref(`vouchersData/${voucherCode}`)
    .once('value');
  return voucherData.val();
}

export function setPaymentData(userId, method, data, callback) {
  return (dispatch) => {
    dispatch(showLoadingBar());
    const paymentId = firebase
      .database()
      .ref()
      .child('paymentsData')
      .push().key;

    const updates = {};
    updates[`paymentsData/${paymentId}`] = { method, data, userId, paymentId };
    updates[`usersData/${userId}/paymentId`] = paymentId;

    return firebase
      .database()
      .ref()
      .update(updates, () => {
        dispatch(successMessage('Payment successfully submitted'));
        callback();
      });
  };
}

export function updateDaySelection(userId, examType, day, callback) {
  return (dispatch) => {
    const daySelection = firebase.database().ref(`appData/daySelectionCount/${examType}/${day}`);
    const userRef = firebase.database().ref(`usersData/${userId}`);
    daySelection.once('value').then(() => {
      daySelection
        .transaction((current) => {
          const count = (current || 0) + 1;
          return count;
        })
        .then(({ committed, snapshot }) => {
          const dayRanking = snapshot.val();
          if (committed) {
            userRef.update({ daySelection: day, dayRanking }, () => {
              dispatch(successMessage('Successfully select exam day'));
              callback();
            });
          } else {
            dispatch(successMessage('Error when selecting exam day'));
          }
        });
    });
  };
}

export async function checkDaySelection(userId) {
  const daySelected = await firebase
    .database()
    .ref(`usersData/${userId}/daySelection`)
    .once('value');
  return daySelected.val();
}

export function watchSelectionCount(examType, day, callback) {
  const daySel = firebase.database().ref(`appData/daySelectionCount/${examType}/${day}`);
  daySel
    .on('value', (snapshot) => {
      console.log('examType', examType);
      console.log('day', day);
      console.log('val', snapshot.val());
      callback(snapshot.val());
    });
}


export function setPaymentImage(uid, file) {
  return (dispatch) => {
    dispatch(showLoadingBar());
    const imageRef = firebase
      .storage()
      .ref()
      .child(`paymentsImage/${uid}`);
    imageRef.put(file).then(() => {
      dispatch(successMessage('Payment image uploaded.'));
    });
  };
}
