import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isFetching: false,
    userData: [],
    error: []
  }, 
  reducers: {
    statusLoginStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusLoginSuccess: (state, action) => {
      state.isFetching = false
      state.userData = action.payload
      state.error = []
    },
    statusLoginFailure: (state, action) => {
      state.isFetching = false
      state.userData = []
      state.error = action.payload
    }
  }
})

export default loginSlice.reducer
export const { statusLoginStart ,statusLoginSuccess ,statusLoginFailure } = loginSlice.actions;
