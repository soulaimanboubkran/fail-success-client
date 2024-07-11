// apiCalls.ts

import { Dispatch } from "redux";
import { loginStart, loginSuccess, loginFailure } from "./userRedux"; // Adjust import path as needed
import { publicRequest } from "../requestMethods"; // Adjust import path as needed

// Login function using async/await
export const login = async (dispatch: Dispatch<any>, user: any) => {
  dispatch(loginStart()); // Dispatching loginStart action

  try {
    const res = await publicRequest.post("/auth/sign-in", user);
    dispatch(loginSuccess(res.data)); // Dispatching loginSuccess with response data
  } catch (err:any) {
    dispatch(loginFailure()); // Dispatching loginFailure in case of error
    throw err.response.data.message;
  }
};
