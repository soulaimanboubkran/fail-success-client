

import axios from "axios";


const BASE_URL = "https://fail-success-backend.vercel.app/api/";

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// Safely get the user data from localStorage
const persistRoot = localStorage.getItem("persist:root");
const user = persistRoot ? JSON.parse(persistRoot).user : null;
const currentUser = user ? JSON.parse(user).currentUser : null;
const TOKEN = currentUser ? currentUser.token : "";

console.log(TOKEN)
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