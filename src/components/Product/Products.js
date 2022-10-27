import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import "./Products.css";

function Products(props) {
    const { keyword } = useParams();
    const key = keyword;
    const dispatch = useDispatch();
    const [ currentPage, setCurrentPage] = useState(2);
    const { products, loading, resultPerPage, prodCount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)   
    }

    useEffect(() => {
        dispatch(getProduct(key,currentPage));
    }, [dispatch, key,currentPage]);
    console.log(currentPage)

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
                totalItemsCount={prodCount}
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
