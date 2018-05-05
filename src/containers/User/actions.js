import * as firebase from 'firebase';
import * as c from './constants';

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
