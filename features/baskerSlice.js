import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const baskerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFroBasket: (state, action) => {
      const indexIsExtested = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (indexIsExtested >= 0) {
        newBasket.splice(indexIsExtested, 1);
      } else {
        ` cant remove product (id : ${action.payload.id}) as its not in basket `;
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFroBasket } = baskerSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export const selectDasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);
export default baskerSlice.reducer;
