import React, { Fragment, useEffect } from 'react'
import { TfiAngleDoubleDown } from "react-icons/tfi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader';


const Home = () => {

  const dispatch = useDispatch();
  const {loading,products} = useSelector(
    state => state.products
  )

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch]);



  return (
    <Fragment>
      {loading ? (<Loader/>)
        :(
        <Fragment>
          <MetaData title="Cartz" />
          <div className="banner">
            <p>Welcome to Cartz</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                scroll <TfiAngleDoubleDown />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products && products.map(product => (
              <ProductCard product={product} />
            ))}
          </div>
        </Fragment>
        )
      }
    </Fragment>
  )
}

export default Home

