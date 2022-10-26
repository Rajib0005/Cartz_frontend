import React, { Fragment, useEffect, } from 'react';
import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions"
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import ReactStars from "react-rating-stars-component"; 
// import ReviewCard from "./ReviewCard.js";


const ProductDetails = (props) => {
    const { id } = useParams();
    
    const dispatch = useDispatch();
    const productId = id;
    const { loading, product } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(productId));

    }, [dispatch, productId]);
    // console.log(product.reviews[0])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
      }

    return (
        <Fragment>
            {loading ? (<Loader />)
                : (
                    <Fragment>
                        <MetaData title={`${product.name} -- Cartz`} />
                        <div className="ProductDetails">
                            <div>
                                <Carousel>
                                    {product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))}
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p> Product # {product._id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <ReactStars {...options} />
                                    <span>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className="detailsBlock-3-1-1">
                                        <button>-</button>
                                        <input value="1" type="number" />
                                        <button>+</button>
                                    </div>
                                    <button>add to cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                                </div>
                                <div className="detailsBlock-4">
                                Description : <p>this is a simple product</p>
                                </div>
                                <button className="submitReview">submit Reviews</button>
                            </div>
                        </div>

                        <h3 className="reviewsHeading">REVIEWS</h3>
                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                <ReviewCard review = {review} />
                        ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
                    </Fragment>
                )
            }
        </Fragment>
    )

}

export default ProductDetails