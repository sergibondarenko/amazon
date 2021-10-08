import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../services/Store';
import { ICurrency, DEFAULT_CURRENCY } from '../services/Payments';

export interface IBasketItem extends IProduct {
  isPrime: boolean;
}

interface IBasketState {
  currency: ICurrency;
  items: Array<IBasketItem>;
}

const initialState: IBasketState = {
  currency: DEFAULT_CURRENCY, 
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
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  }
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = ({ basket }: { basket: IBasketState }) => basket.items;
export const selectTotalPrice = ({ basket }: { basket: IBasketState }) =>
  basket.items.reduce((acc, item) => item.price + acc, 0);
export const selectCurrency = ({ basket }: { basket: IBasketState }) => basket.currency;

export default basketSlice.reducer;
