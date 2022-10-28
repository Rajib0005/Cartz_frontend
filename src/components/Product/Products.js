import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard';
import './Products.css'
import {useLocation} from 'react-router-dom';
import Pagination from 'react-js-pagination';

function Products() {
    const location = useLocation().search;
    const name = new URLSearchParams(location).get('keyword');
    const key = name || '';
   const dispatch = useDispatch();
   const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, resultPerPage, prodcount } = useSelector((state) => state.products);
    
    useEffect(() => {
        dispatch(getProduct(key, currentPage));
    }, [dispatch, key, currentPage]);

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)   
    }
 

    return (
        <Fragment>{loading ? <Loader /> :
            <Fragment>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map(product => (
                        <ProductCard key = {product._id} product={product} />
                    ))}
                </div>
                <div className="paginationBox">
                <Pagination
                currentPage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={prodcount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
              
            </div>
 
            </Fragment>}
        </Fragment>
    )
}

export default Products
