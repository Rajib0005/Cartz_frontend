import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard';
//import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import {useLocation} from 'react-router-dom';

function Products() {
    const location = useLocation().search;
    const name = new URLSearchParams(location).get('keyword');
    const key = name;
   const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct(key));
    }, [dispatch, key]);

   console.log(key)
 

    return (
        <Fragment>{loading ? <Loader /> :
            <Fragment>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map(product => (
                        <ProductCard key = {product._id} product={product} />
                    ))}
                </div>
 
            </Fragment>}
        </Fragment>
    )
}

export default Products
