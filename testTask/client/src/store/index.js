import { configureStore } from "@reduxjs/toolkit";

import companysSlice from "./slices/companysSlice";

export const store = configureStore({
  reducer: {
    companysSlice,
  },
});
