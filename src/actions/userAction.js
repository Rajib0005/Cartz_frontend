import {
    ALL_LOGIN_REQUEST,
    ALL_LOGIN_SUCESS,
    ALL_LOGIN_FAIL,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_FAIL,
} from "../constants/userConstants" 
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ALL_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/login`,
      { email, password },
      config
    );
    
    dispatch({ type: ALL_LOGIN_SUCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: ALL_LOGIN_FAIL, payload: error.response.data.message });
    }
}
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/register`, userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

    export const loadUser = () => async (dispatch) => {
        try {
            dispatch({ type: LOAD_USER_REQUEST });
        
            const { data } = await axios.get(`/api/me`);
        
            dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
          } catch (error) {
            dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
          }
    }
    export const logout = () => async (dispatch) => {
        try {
          await axios.get(`/api/logout`);
      
          dispatch({ type: LOGOUT_SUCCESS });
        } catch (error) {
          dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
        }
      };
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };