import { createSlice } from "@reduxjs/toolkit";
import { SearchParams } from "../../common/types/SearchParams";

interface SearchParamsState {
  data: SearchParams;
}

const initialState: SearchParamsState = {
  data: { location: "", animal: "dog", breed: "" },
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    setAllParams: (state, action) => {
      state.data = action.payload as SearchParams;
    },
  },
});

export const { setAllParams } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
