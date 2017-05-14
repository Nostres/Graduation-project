import { fromJS } from 'immutable';

export const REGISTER_USER = 'user/REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'user/REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'user/REGISTER_USER_FAIL';

export const LOGIN_USER = 'user/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'user/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'user/LOGIN_USER_FAIL';

export const LOGOUT_USER = 'user/LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'user/LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL = 'user/LOGOUT_USER_FAIL';

export const RESTORE_USER = 'user/RESTORE_USER';

const initialState = fromJS({ loggedIn: false });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return state.set('loggingIn', true);
    case LOGIN_USER_FAIL:
      return state.delete('loggingIn');
    case LOGIN_USER_SUCCESS:
    case RESTORE_USER:
      return state
        .set('access_token', action.payload.access_token)
        .set('roles', fromJS(action.payload.roles))
        .set('username', action.payload.username)
        .set('loggedIn', action.payload.access_token && action.payload.roles && action.payload.username)
        .delete('loggingIn');
    case LOGOUT_USER:
      return state.set('logOuting', true);
    case LOGOUT_USER_SUCCESS:
      return initialState;
    case LOGOUT_USER_FAIL:
      return  state.delete('logOuting');
    default:
      return state;
  }
}


export function login(username, password) {
  return {
    type: LOGIN_USER,
    username,
    password
  }
}


export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function register(username, password) {
  return {
    type: REGISTER_USER,
    username,
    password
  }
}

export function isUserLoggedIn(globalState) {
  return globalState.user.get('loggedIn');
}

