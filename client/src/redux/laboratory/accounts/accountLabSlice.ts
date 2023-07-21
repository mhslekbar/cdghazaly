import { createSlice } from "@reduxjs/toolkit";

const accountLabSlice = createSlice({
  name: "accountLab",
  initialState: {
    isFetching: false,
    accountLab: [],
    error: [],
  },
  reducers: {
    statusAccountLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusAccountLabSuccess: (state, action) => {
      state.isFetching = false
      state.accountLab = action.payload
      state.error = []
    },
    statusAccountLabFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.accountLab = []
      }
      state.error = action.payload
    }
  }
}) 

export const { 
  statusAccountLabStart,
  statusAccountLabSuccess,
  statusAccountLabFailure
} = accountLabSlice.actions

export default accountLabSlice.reducer
