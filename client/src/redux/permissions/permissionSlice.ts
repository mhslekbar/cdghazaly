import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    isFetching: false,
    permissions: [],
    error: [],
  },
  reducers: {
    statusPermissionStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusPermissionSuccess: (state, action) => {
      state.isFetching = false
      state.permissions = action.payload
      state.error = []
    },
    statusPermissionFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.permissions = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusPermissionStart, statusPermissionSuccess, statusPermissionFailure } = permissionSlice.actions

export default permissionSlice.reducer
