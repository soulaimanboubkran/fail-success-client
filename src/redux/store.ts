import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userRedux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import openReducer, { OpenState } from "./openReducer";

// Define RootState to capture the combined state shape
export interface RootState {
  user: UserState;
  open: OpenState;
}

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  open: openReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if using redux-persist
    }),
});

export const persistor = persistStore(store);
