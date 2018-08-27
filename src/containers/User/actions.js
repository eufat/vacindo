import * as firebase from 'firebase';
import * as c from './constants';

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
        bookings: value,
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
