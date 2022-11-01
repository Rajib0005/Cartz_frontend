import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard';
import './Products.css'
import {useLocation} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


const categories = [
    "laptop",
    "tv",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

function Products() {
    const location = useLocation().search;
    const name = new URLSearchParams(location).get('keyword');
    const key = name || '';
   const dispatch = useDispatch();
   const [currentPage, setCurrentPage] = useState(1);
   const [price, setPrice] = useState([0, 25200]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const { products, loading, resultPerPage, prodcount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)   
    }
 
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      }

    useEffect(() => {
        dispatch(getProduct(key,currentPage,price,category,ratings));
    }, [dispatch, key,currentPage,price,category,ratings])

    return (
        <Fragment>{loading ? <Loader /> :
            <Fragment>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map(product => (
                        <ProductCard key = {product._id} product={product} />
                    ))}
                </div>
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25200}
                    />
                    <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

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