import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '../state/basket_slice';

export const store = configureStore({ reducer: { basket: basketReducer } });
