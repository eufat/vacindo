import omit from 'lodash/omit';

import * as firebase from 'firebase';
import * as c from './constants';

import { showLoadingBar, successMessage } from '../App/actions';

export function setPayments(payments) {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_PAYMENTS,
      payments,
    });
  };
}

export function setParticipants(participants) {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_PARTICIPANTS,
      participants,
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

export function retrieveParticipants(startAt, endAt, sorting) {
  const usersDataRef = firebase.database().ref('usersData');
  return usersDataRef
    .orderByChild(sorting || 'userNumber')
    .startAt(startAt + 1)
    .endAt(endAt)
    .once('value')
    .then(snapshot => snapshot.val());
}

export async function retrieveParticipant(userId) {
  const rtdb = firebase.database();
  const userRef = rtdb.ref(`usersData/${userId}`);
  const data = await userRef.once('value');
  return data.val();
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

export function retrieveAppData() {
  return (dispatch) => {
    dispatch(showLoadingBar());

    const appDataRef = firebase.database().ref('appData');
    appDataRef.on('value', (snapshot) => {
      const appData = snapshot.val();
      dispatch(setAppData(appData));
      dispatch(successMessage('Succesfully retrieving participants data.'));
    });
  };
}

export async function retrievePaymentImageURL(userId) {
  const storage = firebase.storage();
  const imageRef = storage.ref(`paymentsImage/${userId}`);
  const url = await imageRef.getDownloadURL();

  return url;
}

export async function createVouchers(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const rtdb = firebase.database();
      const url = 'https://hadron.tossaka14th.com/pdf';

      const response = await fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(req),
      });

      let data = await response.json();

      const downloadPath = data.downloadPath;

      data = omit(data, ['downloadPath']);

      rtdb
        .ref('vouchersData')
        .update(data)
        .then(resolve(downloadPath));
    } catch (err) {
      reject(err);
    }
  });
}
