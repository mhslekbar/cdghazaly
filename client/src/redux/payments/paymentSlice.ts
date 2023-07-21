import { createSlice } from "@reduxjs/toolkit";

interface PaymentStateInterface {
  isFetching: boolean;
  payments: [];
  error: string[];
}

const initialState: PaymentStateInterface = {
  isFetching: false,
  payments: [],
  error: [],
}
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    statusPaymentStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPaymentSuccess: (state, action) => {
      state.isFetching = false
      state.payments = action.payload
      state.error = []
    },
    statusPaymentFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.payments = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPaymentStart, statusPaymentSuccess, statusPaymentFailure } = paymentSlice.actions

export default paymentSlice.reducer
