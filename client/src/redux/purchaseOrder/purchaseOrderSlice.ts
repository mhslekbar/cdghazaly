import { createSlice } from "@reduxjs/toolkit";

interface purchaseOrderStateInterface {
  isFetching: boolean;
  purchaseOrders: [];
  error: string[];
}

const initialState: purchaseOrderStateInterface = {
  isFetching: false,
  purchaseOrders: [],
  error: [],
}
const purchaseOrderSlice = createSlice({
  name: "purchaseOrders",
  initialState,
  reducers: {
    statusPurchaseOrderStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPurchaseOrderSuccess: (state, action) => {
      state.isFetching = false
      state.purchaseOrders = action.payload
      state.error = []
    },
    statusPurchaseOrderFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.purchaseOrders = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPurchaseOrderStart, statusPurchaseOrderSuccess, statusPurchaseOrderFailure } = purchaseOrderSlice.actions

export default purchaseOrderSlice.reducer
