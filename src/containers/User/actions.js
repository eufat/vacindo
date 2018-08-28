import values from 'lodash/values';
import * as firebase from 'firebase';
import * as c from './constants';
import { showLoadingBar, successMessage, errorMessage } from '../App/actions';
import generateHash from '../../utils/hash';

export function retrieveUserDestinations(callback) {
  return async (dispatch) => {
    const destinationsDataRef = firebase.database().ref('destinationsData');
    const snapshot = await destinationsDataRef.once('value');
    const value = snapshot.val();

    dispatch({
      type: c.SET_DESTINATIONS,
      destinations: value,
    });

    if (callback !== undefined) {
      callback(value);
    }
  };
}

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

export function retrieveBookingsData(userId, callback) {
  return async (dispatch) => {
    if (userId) {
      const bookingsRef = firebase.database().ref('bookingsData');
      const snapshot = await bookingsRef
        .orderByChild('userId')
        .equalTo(userId)
        .once('value');

      const value = snapshot.val();

      dispatch({
        type: c.SET_BOOKINGS,
        bookings: values(value),
      });

      if (callback !== undefined) {
        callback(value);
      }
    }
  };
}

export function addBooking(booking, callback) {
  return async (dispatch) => {
    const bookingId = generateHash();
    await firebase
      .database()
      .ref(`bookingsData/${bookingId}`)
      .set(booking);

    if (callback !== undefined) {
      callback();
    }
  };
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
    updates[`paymentsData/${paymentId}`] = {
      method,
      data,
      userId,
      paymentId,
    };
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

export async function fetchVoucherData(voucherCode) {
  const voucherData = await firebase
    .database()
    .ref(`vouchersData/${voucherCode}`)
    .once('value');
  return voucherData.val();
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
