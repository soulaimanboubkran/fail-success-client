

import axios from "axios";


const BASE_URL = "http://localhost:4000/api/";

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// Safely get the user data from localStorage
const persistRoot = localStorage.getItem("persist:root");
const user = persistRoot ? JSON.parse(persistRoot).user : null;
const currentUser = user ? JSON.parse(user).currentUser : null;
const TOKEN = currentUser ? currentUser.token : "";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
    'token': `Bearer ${TOKEN}`
  }
});
export const userUploadRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
    'token': `Bearer ${TOKEN}`
  }
});