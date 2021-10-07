import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../services/Store';

interface IBasketState {
  items: Array<IProduct>;
}

const initialState: IBasketState = {
  items: []
};

export const basketSlice = createSlice({
  initialState,
  name: 'basket',
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {}
  }
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = ({ basket }: { basket: IBasketState }) => basket.items;

export default basketSlice.reducer;
