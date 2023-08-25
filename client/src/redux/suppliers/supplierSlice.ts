import { createSlice } from "@reduxjs/toolkit";

interface supplierStateInterface {
  isFetching: boolean;
  suppliers: [];
  error: string[];
}

const initialState: supplierStateInterface = {
  isFetching: false,
  suppliers: [],
  error: [],
}
const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    statusSupplierStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusSupplierSuccess: (state, action) => {
      state.isFetching = false
      state.suppliers = action.payload
      state.error = []
    },
    statusSupplierFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.suppliers = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusSupplierStart, statusSupplierSuccess, statusSupplierFailure } = supplierSlice.actions

export default supplierSlice.reducer
