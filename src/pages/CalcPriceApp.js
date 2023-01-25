import React from "react";
import { Cart, Products } from "../components";
import "./CalcPriceApp.css";

const CalcPriceApp = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-2'>
          {/* Product Component */}
          <Products />
        </div>
        <div className='col-2'>
          {/* Cart Component */}
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default CalcPriceApp;
