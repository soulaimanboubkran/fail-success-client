// userRedux.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";

// Define user state interface
export interface UserState {
  currentUser: any | null;
  isFetching: boolean;
  error: boolean;
}

// Initial state for user slice
const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

// Action types
interface LoginStartAction extends Action {
  type: 'LOGIN_START';
}

interface LoginSuccessAction extends Action {
  type: 'LOGIN_SUCCESS';
  payload: any; // Adjust according to your user data structure
}

interface LoginFailureAction extends Action {
  type: 'LOGIN_FAILURE';
}

// Combine all possible actions into a union type
export type UserActionTypes = LoginStartAction | LoginSuccessAction | LoginFailureAction;

// Create user slice with reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
  },
});

// Export actions and reducer from slice
export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
