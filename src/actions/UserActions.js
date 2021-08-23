import Cookies from "js-cookie";
import Axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

const serverURL = "https://mello-store-backend.herokuapp.com/";

const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(serverURL + "/api/users/login", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    let cookieData = JSON.stringify(data);
    Cookies.set("userInfo", cookieData);
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name: name, email: email, password: password },
  });
  try {
    const { data } = Axios.post(serverURL + "api/users/register", {
      name,
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: { name: name, email: email, password: password },
    });
    if (data) {
      let cookieData = JSON.parse(data);
      Cookies.set("userInfo", cookieData);
    } else {
      Cookies.set("userInfo", "");
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export { register, login };
