import { createSlice } from "@reduxjs/toolkit";

const paymentModeSlice = createSlice({
  name: "paymentModes",
  initialState: {
    isFetching: false,
    paymentModes: [],
    error: [],
  },
  reducers: {
    statusPaymentModeStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPaymentModeSuccess: (state, action) => {
      state.isFetching = false
      state.paymentModes = action.payload
      state.error = []
    },
    statusPaymentModeFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.paymentModes = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPaymentModeStart, statusPaymentModeSuccess, statusPaymentModeFailure } = paymentModeSlice.actions

export default paymentModeSlice.reducer
