import React, { Fragment, useEffect, } from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions"
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'


const ProductDetails = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productId = id;
    const { loading, product } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId]);
    console.log(product.name);
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
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )

}

export default ProductDetails