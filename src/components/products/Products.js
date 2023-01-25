import React, { useEffect } from "react";
// RatingStars Component
import RatingStars from "./RatingStars";
// Product Style File
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotal } from "../../rtk/cartSlice";
import { getAllProducts } from "../../rtk/productSlice";
function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productList);
  //All Products
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className='product-container'>
      {/* Title */}
      <h2>Products</h2>
      {/* Product List */}
      <div className='product-list'>
        {products.map((product, index) => (
          <div
            className='product'
            key={product.id}
          >
            <div className='product-info'>
              <div className='col3-one-product'>
                <img
                  className='product-img'
                  src={product.image}
                  alt='product img'
                />
              </div>
              <div className='col3-two-product'>
                <h5 className='product-name'>{product.name}</h5>
                <p className='description-product'>{product.description}</p>
              </div>
              <div className='col3-three-product'>
                <span className='product-rating'>
                  <RatingStars rating={product.rating} />
                </span>
                <span className='product-price'>
                  &#163;{parseFloat(product.price).toFixed(2)}
                </span>
              </div>
            </div>
            {/* Add To Cart Button */}
            <div className='button-space'>
              <button
                type=''
                className='add-to-cart'
                onClick={() => {
                  dispatch(addToCart(product));
                  dispatch(getTotal());
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
