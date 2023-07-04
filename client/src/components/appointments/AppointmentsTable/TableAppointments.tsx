import React, { useEffect, useState } from "react";
import GetDaysOfWork from "./GetDaysOfWork";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ShowSetAppointApi } from "../../../redux/setAppoint/setAppointApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { DefaultSetAppointmentInterface, SetAppointmentInterface } from "../ConfigAppointment/setAppointments/types";
import MorningAppoint from "./MorningAppoint";
import { DayInfo } from "../ConfigAppointment/DayOfWork/types";
import { AppointmentTableContext } from "./types";

const AppointmentsTable: React.FC = () => {
  const { setAppointment } = useSelector((state: State) => state.setAppointment)
  const { doctorId } = useParams()
  const dispatch: any = useDispatch()
  const [Days, setDays] = useState<DayInfo[]>([]);
  const [desiredDate, setDesiredDate] = useState(new Date("04-07-2023"))


  useEffect(() => {
    const fetchSetAppointment = async () => {
      await dispatch(ShowSetAppointApi(doctorId))
    };
    fetchSetAppointment();
  }, [dispatch, doctorId]);

  const setAppoint = (partOfTime: string): SetAppointmentInterface => {
    return setAppointment.find((setApp: SetAppointmentInterface) => setApp.doctor._id === doctorId && setApp.partOfTime === partOfTime) || DefaultSetAppointmentInterface
  }  
  
  return (
    <AppointmentTableContext.Provider value={{
      Days, setDays,
      desiredDate, setDesiredDate
    }}>
    <div className="flex flex-col border mt-3">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <GetDaysOfWork />
              <tbody>
                <MorningAppoint setAppoint={setAppoint} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AppointmentTableContext.Provider>
  );
};

export default AppointmentsTable;
