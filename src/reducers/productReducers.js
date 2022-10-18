import { 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_SUCESS, 
    PRODUCT_DETAILS__FAIL,
    PRODUCT_DETAILS__REQUEST,
    PRODUCT_DETAILS__SUCESS,
    CLEAR_ERRORS } from "../constants/productConstants";
    
export const productReducer = (
    state = { products: [] },
    action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case ALL_PRODUCT_SUCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload.products
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const productDetailsReducer = (
    state = { product: {} },
    action) => {
    switch (action.type) {
        case PRODUCT_DETAILS__REQUEST:
            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAILS__SUCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS__FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}