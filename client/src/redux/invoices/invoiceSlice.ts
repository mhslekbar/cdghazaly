import { createSlice } from "@reduxjs/toolkit";
import { InvoicesInterface } from "../../components/ManagePatient/Invoices/types";

interface initialStateInterface {
  isFetching: boolean,
  invoices: InvoicesInterface[],
  error: string[],
}
const initialState:initialStateInterface = {
  isFetching: false,
  invoices: [],
  error: [],
}
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    statusInvoiceStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusInvoiceSuccess: (state, action) => {
      state.isFetching = false
      state.invoices = action.payload
      state.error = []
    },
    statusInvoiceFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.invoices = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusInvoiceStart, statusInvoiceSuccess, statusInvoiceFailure } = invoiceSlice.actions

export default invoiceSlice.reducer
