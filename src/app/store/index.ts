import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "../../features/adoptedPet/adoptedPetSlice";
import searchParams from "../../features/searchParams/searchParamsSlice";
import { petApi } from "../../api/services/petApi";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(petApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
