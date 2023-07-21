import { createSlice } from "@reduxjs/toolkit";

interface ListConsumableStateInterface {
  isFetching: boolean;
  ListConsumable: [];
  error: string[];
}

const initialState: ListConsumableStateInterface = {
  isFetching: false,
  ListConsumable: [],
  error: [],
}
const ListConsumableSlice = createSlice({
  name: "ListConsumable",
  initialState,
  reducers: {
    statusListConsumableStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusListConsumableSuccess: (state, action) => {
      state.isFetching = false
      state.ListConsumable = action.payload
      state.error = []
    },
    statusListConsumableFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.ListConsumable = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusListConsumableStart, statusListConsumableSuccess, statusListConsumableFailure } = ListConsumableSlice.actions

export default ListConsumableSlice.reducer
