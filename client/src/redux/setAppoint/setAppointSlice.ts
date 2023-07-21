import { createSlice } from "@reduxjs/toolkit";
import { DefaultSetAppointmentInterface, SetAppointmentInterface } from "../../components/appointments/ConfigAppointment/setAppointments/types";

interface initialStateInterface {
  isFetching: boolean,
  setAppointment: SetAppointmentInterface[],
  error: string[],
}
const initialState:initialStateInterface = {
  isFetching: false,
  setAppointment: [DefaultSetAppointmentInterface],
  error: [],
}
const setAppointSlice = createSlice({
  name: "setAppointment",
  initialState,
  reducers: {
    statusSetAppointStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusSetAppointSuccess: (state, action) => {
      state.isFetching = false
      state.setAppointment = action.payload
      state.error = []
    },
    statusSetAppointFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.setAppointment = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusSetAppointStart, statusSetAppointSuccess, statusSetAppointFailure } = setAppointSlice.actions

export default setAppointSlice.reducer
