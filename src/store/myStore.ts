import { configureStore } from '@reduxjs/toolkit';
import { mySliceReducer } from './mySlice';

const isDev = import.meta.env.MODE !== 'production';
console.log(import.meta.env.MODE);
console.log(import.meta.env.VITE_APP_TITLE);
export const myStore = configureStore({
  reducer: { myData: mySliceReducer },
  devTools: isDev,
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
