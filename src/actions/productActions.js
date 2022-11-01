import axios from 'axios';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS
} from "../constants/productConstants";

export const getProduct = (keyword ='',currentPage=1,price = [0, 25000],category,ratings = 0) => async (dispatch) => {
  try {
    dispatch({ 
      type: ALL_PRODUCT_REQUEST,
    });

    let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);

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

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
}


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}