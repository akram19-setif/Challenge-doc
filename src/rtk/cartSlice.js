import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  subTotal: 0,
  disCount: 0,
  total: 0,
  // offer one :
  discountPrice: 0.5,
  // offer two :
  discountQuantity: 1,
  numberForModulo: 0,
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    // Add To Cart Function
    addToCart: (state, action) => {
      const findItem = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findItem < 0) {
        state.cart.push(action.payload);
      }
    },
    // Cart TotalPrice function
    getTotal: (state, action) => {
      const { totalCartPrice } = state.cart.reduce(
        (total, cartItem) => {
          const { price, quantity } = cartItem;
          const productTotal = price * quantity;
          total.totalCartPrice += productTotal;
          return total;
        },
        {
          totalCartPrice: 0,
        }
      );
      if (state.disCount > 0) {
        state.subTotal = totalCartPrice;
        state.total = totalCartPrice - state.disCount;
      } else {
        state.total = totalCartPrice;
      }
    },
    // ================= Single Product Total Functions =================
    increaseProductTotal: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            productTotalPrice: item.productTotalPrice + item.price,
          };
        }
        return item;
      });
    },
    decreaseProductTotal: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.productTotalPrice > item.price) {
          return {
            ...item,
            productTotalPrice: item.productTotalPrice - item.price,
          };
        }
        return item;
      });
    },
    // ==============  Quantity Functions ===================
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        // increase Quantity
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    // ======================= Offers Functions ================
    increaseOffers: (state, action) => {
      const isMilk = action.payload.name.toLowerCase().includes("milk");
      if (!isMilk) {
        // *** Offer One ****
        const findItemButter = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("butter")
        );
        const findItemBread = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("bread")
        );
        if (
          findItemBread >= 0 &&
          findItemButter >= 0 &&
          state.cart[findItemButter].quantity % 2 === 0
        ) {
          // Received offer
          state.cart[findItemBread].priceOfferReceived +=
            state.cart[findItemBread].productTotalPrice / 2;
          // dicount
          state.disCount += state.cart[findItemBread].productTotalPrice / 2;
          // setProductTotalPrice
          state.cart[findItemBread].productTotalPrice =
            state.cart[findItemBread].productTotalPrice / 2;
        }
      } else {
        // *** Offer Two ***
        const findItemMilk = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("milk")
        );

        if (findItemMilk >= 0 && state.cart[findItemMilk].quantity % 4 === 0) {
          state.numberForModulo += 1;
          // Add price discount
          state.disCount += state.cart[findItemMilk].price;
          // Change product total price
          state.cart[findItemMilk].productTotalPrice -=
            state.cart[findItemMilk].price;
          // save price offer received
          state.cart[findItemMilk].priceOfferReceived +=
            state.cart[findItemMilk].price;
          // set
        }
      }
    },
    decreaseOffers: (state, action) => {
      const isMilk = action.payload.name.toLowerCase().includes("milk");
      if (!isMilk) {
        // ***  Offer One ***
        const findItemButter = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("butter")
        );
        const findItemBread = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("bread")
        );
        if (
          findItemBread >= 0 &&
          findItemButter >= 0 &&
          state.cart[findItemButter].quantity % 2 !== 0 &&
          state.disCount > 0
        ) {
          //  Set SubTotal
          state.subTotal -=
            state.total + state.cart[findItemBread].priceOfferReceived;

          //Set dicount
          state.disCount -= state.cart[findItemBread].productTotalPrice;

          // Set Received offer
          state.cart[findItemBread].priceOfferReceived -=
            state.cart[findItemBread].productTotalPrice;

          // setProductTotalPrice
          state.cart[findItemBread].productTotalPrice =
            state.cart[findItemBread].productTotalPrice * 2;
        }
      } else {
        // **** Offer Two *****
        const findItemMilk = state.cart.findIndex((item) =>
          item.name.toLowerCase().includes("milk")
        );

        if (
          findItemMilk >= 0 &&
          (state.cart[findItemMilk].quantity + state.numberForModulo) % 4 ===
            0 &&
          state.disCount > 0 &&
          state.cart[findItemMilk].priceOfferReceived > 0
        ) {


          state.numberForModulo -= 1;
          // Set SubTotal
          state.subTotal -= state.total + state.cart[findItemMilk].price;
          // Set discount
          state.disCount -= state.cart[findItemMilk].price;

          // Change product total price
          state.cart[findItemMilk].productTotalPrice +=
            state.cart[findItemMilk].price;

          // Set received after Offer
          state.cart[findItemMilk].priceOfferReceived -=
            state.cart[findItemMilk].price;


        } else if (
          findItemMilk >= 0 &&
          state.cart[findItemMilk].quantity % 4 !== 0 &&
          state.disCount > 0
        ) {
          
          // Set SubTotal
          state.subTotal -= state.cart[findItemMilk].price;
          // Change product total price
          state.cart[findItemMilk].productTotalPrice -=
            state.cart[findItemMilk].price;
        }
      }
    },
  },
});

// export Actions  Cart
export const {
  addToCart,
  getTotal,
  increaseItemQuantity,
  decreaseItemQuantity,
  increaseProductTotal,
  decreaseProductTotal,
  increaseOffers,
  decreaseOffers,
} = cartSlice.actions;

export default cartSlice.reducer;
