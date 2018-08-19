import * as firebase from 'firebase';
import * as c from './constants';

import { showLoadingBar, successMessage } from '../App/actions';
import generateHash from '../../utils/hash';

export function setPayments(payments) {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_PAYMENTS,
      payments,
    });
  };
}

export function createDestination(formData, placeholderImage) {
  const file = placeholderImage;
  const destinationId = generateHash();

  return async (dispatch) => {
    dispatch(showLoadingBar());
    const imageRef = firebase
      .storage()
      .ref()
      .child(`destinationsImage/${destinationId}`);

    await imageRef.put(file);

    dispatch(successMessage('Destination placeholder image uploaded.'));
    dispatch(showLoadingBar());

    const imageURL = await imageRef.getDownloadURL();

    const withImageFormData = {
      ...formData,
      imageURL,
    };

    await firebase
      .database()
      .ref(`destinationsData/${destinationId}`)
      .set(withImageFormData);
    dispatch(successMessage(`Destination ${formData.title} created.`));
  };
}

export async function retrieveAdminDestinations(adminUID) {
  const destinationsDataRef = firebase.database().ref('destinationsData');
  const snapshot = await destinationsDataRef.orderByChild('admin').equalTo(adminUID).once('value');
  const value = snapshot.val();
  if (value) {
    return value;
  }
}

export function setTourists(tourists) {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_TOURISTS,
      tourists,
    });
  };
}

export function setAppData(appData) {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_APPDATA,
      appData,
    });
  };
}

export function attendTourist(userId) {
  const now = new Date();
  const timestamp = now.getTime();

  const rtdb = firebase.database();
  const updates = {};

  updates[`/usersData/${userId}/attendedTime/`] = timestamp;
  return rtdb.ref().update(updates);
}

export function retrieveTourists(startAt, endAt, sorting) {
  const usersDataRef = firebase.database().ref('usersData');
  return usersDataRef
    .orderByChild(sorting || 'userNumber')
    .startAt(startAt + 1)
    .endAt(endAt)
    .once('value')
    .then(snapshot => snapshot.val());
}

export async function retrieveTourist(userId) {
  const rtdb = firebase.database();
  const userRef = rtdb.ref(`usersData/${userId}`);
  const data = await userRef.once('value');
  return data.val();
}

export async function deleteTourist(userId) {
  const rtdb = firebase.database();
  const userRef = rtdb.ref(`usersData/${userId}`);
  userRef.set(null).then(() => console.log(`deleting ${userId}.`));
}

export async function retrievePayments(startAt, endAt, sorting) {
  const usersDataRef = firebase.database().ref('paymentsData');
  const query = await usersDataRef
    .orderByChild(sorting || 'paymentNumber')
    .startAt(startAt + 1)
    .endAt(endAt)
    .once('value');

  return query.val();
}

export async function retrievePayment(paymentId) {
  const rtdb = firebase.database();
  const userRef = rtdb.ref(`paymentsData/${paymentId}`);
  const data = await userRef.once('value');
  return data.val();
}

export function verifyPayment(paymentId, timestamp) {
  // unverify payment with timestamp = ''
  const updates = {};
  updates[`/paymentsData/${paymentId}/verificationTime/`] = timestamp;
  // increment verified payment
  const verifiedPayment = firebase.database().ref('appData/verifiedPaymentCount');
  verifiedPayment.once('value').then(() => {
    verifiedPayment.transaction((current) => {
      const newCount = (current || 0) + 1;
      return newCount;
    });
  });

  return firebase
    .database()
    .ref()
    .update(updates);
}

export function deletePayment(paymentId, userId) {
  const updates = {};
  updates[`/paymentsData/${paymentId}`] = null;
  updates[`/usersData/${userId}/paymentId`] = '';
  // decrement verified payment
  const verifiedPayment = firebase.database().ref('appData/verifiedPaymentCount');
  verifiedPayment.once('value').then(() => {
    verifiedPayment.transaction((current) => {
      const newCount = current === 0 ? current - 1 : 0;
      return newCount;
    });
  });

  return firebase
    .database()
    .ref()
    .update(updates);
}

export function retrieveAppData() {
  return (dispatch) => {
    dispatch(showLoadingBar());

    const appDataRef = firebase.database().ref('appData');
    appDataRef.on('value', (snapshot) => {
      const appData = snapshot.val();
      dispatch(setAppData(appData));
      dispatch(successMessage('Succesfully retrieving tourists data.'));
    });
  };
}

export async function retrievePaymentImageURL(userId) {
  const storage = firebase.storage();
  const imageRef = storage.ref(`paymentsImage/${userId}`);
  const url = await imageRef.getDownloadURL();

  return url;
}
