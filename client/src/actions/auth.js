import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = (authData) => async (dispatch) => {
  try {
    console.log(authData);
    const { data } = await api.login(authData);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    toast.error(error.message);
  }
};

export const register = (regData) => async (dispatch) => {
  try {
    console.log(regData);
    const { data } = await api.login(regData);
    dispatch({ type: "REGISTER", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    toast.error(error.message);
  }
};
