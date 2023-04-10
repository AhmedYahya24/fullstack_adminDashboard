import { configureStore } from "@reduxjs/toolkit";
import global from "./globalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

const store = configureStore({
  reducer: {
    global,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
