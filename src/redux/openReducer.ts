// src/store/reducers/openReducer.ts
import { createSlice } from '@reduxjs/toolkit';

export interface OpenState {
    isOpen: boolean;
  }
  
  const initialState: OpenState = {
    isOpen: true,
  };

const openSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleOpen } = openSlice.actions;

export default openSlice.reducer;
