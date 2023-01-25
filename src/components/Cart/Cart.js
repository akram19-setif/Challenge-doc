import React, { useState } from "react";
// Icons :
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
// Cart file style
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
//  cart actions
import {
  decreaseItemQuantity,
  getTotal,
  increaseItemQuantity,
  increaseProductTotal,
  decreaseProductTotal,
  increaseOffers,
  decreaseOffers,
} from "../../rtk/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  // Get Data From State
  const cart = useSelector((state) => state.carts.cart);
  const subTotal = useSelector((state) => state.carts.subTotal);
  const disCount = useSelector((state) => state.carts.disCount);
  const total = useSelector((state) => state.carts.total);

  return (
    <div className='cart-container'>
      {/* Title */}
      <h2>
        Cart <AiOutlineShoppingCart />
      </h2>

      {/* Cart Products  */}
      <div className='cart-list'>
        {cart.map((product, index) => (
          <div
            className='cart'
            key={product.id}
          >
            <div className='cart-info'>
              <div className='col3-one-cart'>
                <img
                  className='cart-img'
                  src={product.image}
                  alt='product img'
                />
              </div>
              <div className='col3-two-cart'>
                <h5 className='cart-name'>{product.name}</h5>
                <div className='quantity-cart'>
                  quantity &#58;
                  <AiOutlineMinusCircle
                    className='quantity-btn'
                    onClick={() => {
                      dispatch(decreaseItemQuantity(product));
                      dispatch(decreaseProductTotal(product.id));
                      dispatch(decreaseOffers(product));
                      dispatch(getTotal());
                    }}
                  />
                  <span className='quantity-nbr'> {product.quantity}</span>
                  <AiOutlinePlusCircle
                    className='quantity-btn'
                    onClick={() => {
                      dispatch(increaseItemQuantity(product));
                      dispatch(increaseProductTotal(product.id));
                      dispatch(increaseOffers(product));
                      dispatch(getTotal());
                    }}
                  />
                </div>
              </div>
              <div className='col3-three-cart'>
                {/* After  get an Offer */}
                {product.priceOfferReceived > 0 ? (
                  <div className='product-price-container'>
                    <span className='old-product-price price'>
                      &#163;
                      {parseFloat(
                        product.productTotalPrice + product.priceOfferReceived
                      ).toFixed(2)}
                    </span>
                    <br />
                    <span className='price'>
                      &#163;
                      {parseFloat(product.productTotalPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className='price'>
                    &#163;
                    {parseFloat(
                      product.productTotalPrice + product.priceOfferReceived
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Total Price Calculation */}
      <div className='total-calc'>
        <div>
          <h4>SubTotal</h4>
          <span className=' price'>
            &#163;{parseFloat(subTotal).toFixed(2)}
          </span>
        </div>
        <div>
          <h4>Discount</h4>
          <span className='price'>&#163;{parseFloat(disCount).toFixed(2)}</span>
        </div>
        <div>
          <h4>Total</h4>
          <span className='price'>&#163;{parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
