import { configureStore } from '@reduxjs/toolkit';
import { savegames, gameData } from './savegameSlice';
// ...

export const store = configureStore({
  reducer: {
    savegames,
    gameData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
