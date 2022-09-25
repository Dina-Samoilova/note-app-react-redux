import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/Notes/NoteSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
