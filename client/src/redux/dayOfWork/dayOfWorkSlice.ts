import { createSlice } from "@reduxjs/toolkit";
import { DayOfWorkInterface, DefaultDayOfWorkInterface } from "../../components/appointments/ConfigAppointment/DayOfWork/types";

interface initialStateInterface {
  isFetching: boolean,
  daysOfWork: DayOfWorkInterface,
  error: string[],
}

const initialState:initialStateInterface = {
  isFetching: false,
  daysOfWork: DefaultDayOfWorkInterface,
  error: [],
}

const daysOfWorkSlice = createSlice({
  name: "daysOfWork",
  initialState,
  reducers: {
    statusDayOfWorkStart: (state) => {
      state.isFetching = true
      state.error = []
    },
    statusDayOfWorkSuccess: (state, action) => {
      state.isFetching = false
      state.daysOfWork = action.payload
      state.error = []
    },
    statusDayOfWorkFailure: (state, action) => {
      state.isFetching = false
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.daysOfWork = DefaultDayOfWorkInterface
      }
      state.error = action.payload
    }
  }
}) 

export const { statusDayOfWorkStart, statusDayOfWorkSuccess, statusDayOfWorkFailure } = daysOfWorkSlice.actions

export default daysOfWorkSlice.reducer
