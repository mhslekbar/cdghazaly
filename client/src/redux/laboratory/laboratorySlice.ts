import { createSlice } from "@reduxjs/toolkit";

const laboratorySlice = createSlice({
  name: "laboratory",
  initialState: {
    isFetching: false,
    laboratory: [],
    error: [],
  },
  reducers: {
    statusLabStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusLabSuccess: (state, action) => {
      state.isFetching = false
      state.laboratory = action.payload
      state.error = []
    },
    statusLabFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    }
  }
}) 

export const { statusLabStart, statusLabSuccess, statusLabFailure } = laboratorySlice.actions

export default laboratorySlice.reducer
