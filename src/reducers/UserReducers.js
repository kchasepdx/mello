import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from "../constants/userConstants";

function userRegisterReducer(state = {}, action) {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        userInfo: [],
      };

    default:
      return state;
  }
}

export { userRegisterReducer, userLoginReducer };
