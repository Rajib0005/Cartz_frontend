import React, { Fragment, useEffect, } from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions"
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';


const ProductDetails = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productId = id;
    const { loading, product } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId]);

    return (
        <Fragment>
            {loading ? (<Loader />)
                : (
                    <Fragment>
                        <div className='ProductDetails'>
                            <div>
                                <Carousel>
                                    {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                    
                  ))}

                        {/* <img src="https://www.leatherclue.com/image/cache/catalog/AB_TEES/Plain%20T/royal-blue-men-s-tshirt-550x550h.jpg"
                            className="CarouselImage"
                        /> */}
                                </Carousel>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )

}

export default ProductDetails