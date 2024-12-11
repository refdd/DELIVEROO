import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/baskerSlice";
import reataurantReducer from "./features/restaurantSlice";
const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: reataurantReducer,
  },
});

export default store;
