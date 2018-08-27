import * as firebase from 'firebase';
import * as c from './constants';

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

export function addBooking(booking) {
  return (dispatch) => {
    dispatch({
      type: c.ADD_BOOKING,
      booking,
    });
  };
}
