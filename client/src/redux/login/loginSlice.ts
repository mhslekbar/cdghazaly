import { createSlice } from "@reduxjs/toolkit";
import { DefaultUserInterface, UserInterface } from "../../components/users/types";

interface initialStateInterface {
  isFetching: boolean,
  userData: UserInterface,
  error: string[],
}

const initialState: initialStateInterface = {
  isFetching: false,
  userData: DefaultUserInterface,
  error: [],
}


const loginSlice = createSlice({
  name: "login",
  initialState,
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
      state.error = action.payload
    }
  }
}) 

export const { statusLoginStart, statusLoginSuccess, statusLoginFailure } = loginSlice.actions

export default loginSlice.reducer
