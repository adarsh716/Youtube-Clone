import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = (authData) => async (dispatch) => {
  try {
    console.log(authData);
    const { data } = await api.login(authData);
    const { token } = data;
    localStorage.setItem('authToken', token);
    dispatch({ type: "LOGIN", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    toast.error(error.message);
  }
};

export const register = (regData) => async (dispatch) => {
  try {
    console.log(regData);
    const { data } = await api.register(regData);
    dispatch({ type: "REGISTER", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    toast.error(error.message);
  }
};

export const subscribeToChannel = (userId, channelId) => async (dispatch) => {
  try {
    const { data } = await api.subscribe(userId, channelId);
    console.log(data);
    dispatch({ type: "SUBSCRIBE_TO_CHANNEL",payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};

export const unsubscribeFromChannel = (userId, targetUserId) => async (dispatch) => {
  try {
    const { data } = await api.unsubscribe(userId, targetUserId);
    console.log(data);
    dispatch({ type: "UNSUBSCRIBE_FROM_CHANNEL", payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};


