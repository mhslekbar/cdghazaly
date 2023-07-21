import { createSlice } from "@reduxjs/toolkit";

const assuranceSlice = createSlice({
  name: "assurance",
  initialState: {
    isFetching: false,
    assurances: [],
    error: [],
  },
  reducers: {
    statusAssuranceStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusAssuranceSuccess: (state, action) => {
      state.isFetching = false
      state.assurances = action.payload
      state.error = []
    },
    statusAssuranceFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.assurances = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusAssuranceStart, statusAssuranceSuccess, statusAssuranceFailure } = assuranceSlice.actions

export default assuranceSlice.reducer
