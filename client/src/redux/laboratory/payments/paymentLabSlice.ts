import { createSlice } from "@reduxjs/toolkit";

const paymentLabSlice = createSlice({
  name: "paymentLab",
  initialState: {
    isFetching: false,
    paymentLab: [],
    error: [],
  },
  reducers: {
    statusPaymentLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPaymentLabSuccess: (state, action) => {
      state.isFetching = false
      state.paymentLab = action.payload
      state.error = []
    },
    statusPaymentLabFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
}) 

export const { 
  statusPaymentLabStart,
  statusPaymentLabSuccess,
  statusPaymentLabFailure
} = paymentLabSlice.actions

export default paymentLabSlice.reducer
