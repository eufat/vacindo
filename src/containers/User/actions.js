import * as firebase from 'firebase';

import { showLoadingBar, successMessage } from '../App/actions';

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
        dispatch(successMessage('Payment successfully submitted.'));
        callback();
      });
  };
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
