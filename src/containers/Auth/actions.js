import * as firebase from 'firebase';
import * as c from './constants';

import { showLoadingBar, successMessage, errorMessage } from '../App/actions';

export function resetAuthentication(email) {
  return (dispatch) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(successMessage('Reset link sent to email.'));
      });
  };
}

export function setCurrentUser(user) {
  return dispatch => [
    dispatch({
      type: c.FETCH_USER_DATA,
      user,
    }),
  ];
}

export function setCurrentRole(role) {
  return dispatch => [
    dispatch({
      type: c.SET_USER_ROLE,
      role,
    }),
  ];
}

export function removeCurrentUser() {
  return (dispatch) => {
    dispatch({
      type: c.DEAUTHENTICATE_USER,
    });
  };
}

async function checkAdmin(userId) {
  try {
    const adminValue = await firebase
      .database()
      .ref(`adminData/${userId}`)
      .once('value');
    return adminValue.val();
  } catch (err) {
    throw err;
  }
}

export function checkAuthentication(history) {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const isAdmin = await checkAdmin(user.uid);
          dispatch(setCurrentUser(user));
          dispatch(setCurrentRole(isAdmin));
          if (isAdmin) {
            history.push('/admin/');
          } else {
            history.push('/user/');
          }
        } catch (err) {
          dispatch(errorMessage(err.message));
        }
      } else {
        history.push('/auth/');
        dispatch(removeCurrentUser());
      }
    });
  };
}

export function writeUserData(user, data, cb) {
  firebase
    .database()
    .ref(`usersData/${user.uid}`)
    .set(data)
    .then(cb());
}

export function createAuthentication(email, password, optional) {
  const userData = { email, ...optional };

  return (dispatch) => {
    dispatch(showLoadingBar());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          writeUserData(user, userData, () => {
            dispatch(setCurrentUser(user));
            dispatch(successMessage(`${user.email} was successfully created.`));
          });
        },
        (error) => {
          dispatch(errorMessage(error.message));
        },
      );
  };
}

export function submitAuthentication(email, password, persistence) {
  const isPersistence = persistence
    ? firebase.auth.Auth.Persistence.SESSION
    : firebase.auth.Auth.Persistence.LOCAL;

  return (dispatch) => {
    dispatch(showLoadingBar());
    firebase
      .auth()
      .setPersistence(isPersistence)
      .then(() =>
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
            (user) => {
              dispatch(setCurrentUser(user));
              dispatch(successMessage(`${user.email} was successfully signed in.`));
            },
            (error) => {
              dispatch(errorMessage(error.message));
            },
          ))
      .catch((error) => {
        dispatch(errorMessage(error.message));
      });
  };
}

export function closeAuthentication(successF = noop => noop, errorF = noop => noop) {
  return (dispatch) => {
    dispatch(showLoadingBar());
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          successF();
          dispatch(removeCurrentUser());
          dispatch(successMessage('Successfully signed out.'));
        },
        (error) => {
          errorF();
          dispatch(errorMessage(error.message));
        },
      );
  };
}
