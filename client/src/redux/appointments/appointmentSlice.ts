import { createSlice } from "@reduxjs/toolkit";
import { AppointmentInterface, DefaultAppointmentInterface } from "../../components/appointments/AppointmentsTable/types";

interface AppointmentSliceInterface {
  isFetching:  boolean,
  appointments: AppointmentInterface[],
  error: string[],
}

const initialState: AppointmentSliceInterface =  {
  isFetching:  false,
  appointments: [DefaultAppointmentInterface],
  error: [],
}

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    statusAppointmentStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusAppointmentSuccess: (state, action) => {
      state.isFetching = false
      state.appointments = action.payload
      state.error = []
    },
    statusAppointmentFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.appointments = []
      }
      state.error = action.payload
    }
  }
}) 

export const { statusAppointmentStart, statusAppointmentSuccess, statusAppointmentFailure } = appointmentSlice.actions

export default appointmentSlice.reducer
