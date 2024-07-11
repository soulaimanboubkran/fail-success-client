// types.ts

import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store'; // Adjust the path according to your project structure

// Define action types if needed
export interface LoginStartAction extends Action {
  type: 'LOGIN_START';
}

export interface LoginSuccessAction extends Action {
  type: 'LOGIN_SUCCESS';
  payload: any; // Adjust according to your user data structure
}

export interface LoginFailureAction extends Action {
  type: 'LOGIN_FAILURE';
}

// Combine all possible actions into a union type
export type UserActionTypes = LoginStartAction | LoginSuccessAction | LoginFailureAction;

// Define AppDispatch type
export type AppDispatch = ThunkDispatch<RootState, void, UserActionTypes>;
