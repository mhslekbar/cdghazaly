import { createSlice } from "@reduxjs/toolkit";

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState: {
    isFetching: false,
    paymentMethods: [],
    error: [],
  },
  reducers: {
    statusPaymentMethodStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPaymentMethodSuccess: (state, action) => {
      state.isFetching = false
      state.paymentMethods = action.payload
      state.error = []
    },
    statusPaymentMethodFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.paymentMethods = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPaymentMethodStart, statusPaymentMethodSuccess, statusPaymentMethodFailure } = paymentMethodSlice.actions

export default paymentMethodSlice.reducer
