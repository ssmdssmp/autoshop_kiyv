import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/Filters/filtersSlice";
import items from "../components/MainList/mainListSlice";
import stash from "../components/Stash/StashSlice";
const middlewareTemp = () => {};
export default configureStore({
  reducer: {
    filters,
    items,
    stash,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
