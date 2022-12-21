import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// Slices
import basketSlice from "./slices/basketSlice"
import pictureSlice from "./slices/pictureSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const reducers = combineReducers({
  basket: basketSlice,
  picture: pictureSlice
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
