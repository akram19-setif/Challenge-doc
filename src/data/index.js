// all images
import butter from "./butter.jpg";
import bread from "./bread.jpg";
import milk from "./milk.jpg";

// products data
export const products = [
  {
    id: 1,
    image: bread,
    name: "Whole french bread",
    description: "made in paris and destinated to whole World",
    rating: 4.5,
    price: 1.0,
    quantity: 1,
    productTotalPrice: 1.0,
    priceOfferReceived: 0,
  },
  {
    id: 2,
    image: milk,
    name: "Fresh Suiss milk",
    description: "semi skimmed milk that comes straight from the alpes farmers",
    rating: 4.7,
    price: 1.15,
    quantity: 1,
    productTotalPrice: 1.15,
    priceOfferReceived: 0,
  },
  {
    id: 3,
    image: butter,
    name: "Butter",
    description: "produced by us to insure a high quality butter",
    rating: 4.5,
    price: 0.8,
    quantity: 1,
    productTotalPrice: 0.8,
    priceOfferReceived: 0,
  },
];
