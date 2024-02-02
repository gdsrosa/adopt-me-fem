import { createSlice } from "@reduxjs/toolkit";
import { Pet } from "../../common/types/ApiResponses";

interface adoptedPetState {
  data: Pet | null;
}

const initialState: adoptedPetState = {
  data: null,
};

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopt: (state, action) => {
      state.data = action.payload as Pet;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
