import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../services/Store';

export interface IBasketItem extends IProduct {
  _id: string; 
  isPrime: boolean;
}

interface IBasketState {
  items: Array<IBasketItem>;
}

const initialState: IBasketState = {
  items: []
};

export const basketSlice = createSlice({
  initialState,
  name: 'basket',
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, { ...action.payload, id: uuidv4() }];
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    }
  }
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = ({ basket }: { basket: IBasketState }) => basket.items;
export const selectTotalPrice = ({ basket }: { basket: IBasketState }) =>
  basket.items.reduce((acc, item) => item.price + acc, 0);

export default basketSlice.reducer;
