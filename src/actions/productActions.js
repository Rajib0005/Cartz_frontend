import axios from'axios';
import { 
     ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_SUCESS, 
    PRODUCT_DETAILS__FAIL,
    PRODUCT_DETAILS__REQUEST,
    PRODUCT_DETAILS__SUCESS,
    CLEAR_ERRORS } from "../constants/productConstants";

export const getProduct = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
  
        const { data } = await axios.get("api/products");
  
        dispatch({
          type: ALL_PRODUCT_SUCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.message,
        });
    }
}


export const getProductDetails = (id)=> async(dispatch)=>{
  try {
      dispatch({ type: PRODUCT_DETAILS__REQUEST });

      const { data } = await axios.get(`api/products/${id}`);

      dispatch({
        type: PRODUCT_DETAILS__SUCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS__FAIL,
        payload: error.response.data.message,
      });
  }
}


export const clearErrors = ()=> async(dispatch)=>{
    dispatch({ type: CLEAR_ERRORS });
}