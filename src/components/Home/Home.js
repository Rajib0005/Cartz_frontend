import React, { Fragment } from 'react'
import { TfiAngleDoubleDown } from "react-icons/tfi";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name : "blue tshirt",
  images: [{url: "https://www.leatherclue.com/image/cache/catalog/AB_TEES/Plain%20T/royal-blue-men-s-tshirt-550x550h.jpg"}],
  price: "1000",
  _id: "abhishek",
}
const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Cartz</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    scroll <TfiAngleDoubleDown/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
          <Product product = {product} />
        </div>
    </Fragment>
  )
}

export default Home

