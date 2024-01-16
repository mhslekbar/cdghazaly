import React, { useEffect, useState } from "react";
import { ShowAppointmentContext } from "./types";
import HeaderAppointment from "./HeaderAppointment";
import SuccessMsg from "../../Messages/SuccessMsg";
import AddNewAppointment from "./AddNewAppointment";
import AppointmentsTable from "./AppointmentsTable/TableAppointments";
import { useDispatch } from "react-redux";
import { ShowAppointmentApi } from "../../redux/appointments/appointmentApiCalls";
import { useParams } from "react-router";
import DeleteAppointment from "./DeleteAppointment";
import ToggleTableAppointment from "./ToggleTableAppointment";
import { ShowSetAppointApi } from "../../redux/setAppoint/setAppointApiCalls";
import { ShowDayOfWorkApi } from "../../redux/dayOfWork/dayOfWorkApiCalls";
import { ShowPatientsApi } from "../../redux/patients/patientApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../redux/store";

const ShowAppointments: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTd, setSelectedTd] = useState<any>()
  const [selectedAppointment, setSelectedAppointment] = useState<any>();
  const [filterByDate, setFilterByDate] = useState<Date>(new Date())

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()

  const { daysOfWork } = useSelector((state: State) => state.daysOfWork)
  const { setAppointment } = useSelector((state: State) => state.setAppointment)

  useEffect(() => {
    const fetchSetAppointment = async () => {
      await dispatch(ShowSetAppointApi(doctorId))
    };
    fetchSetAppointment();
  }, [dispatch, doctorId]);

  useEffect(() => {
    const fetchDays = async () => {
      await dispatch(ShowDayOfWorkApi(doctorId))
    }
    fetchDays()
  }, [dispatch, doctorId, ])

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi());
    };
    fetchPatient();
  }, [dispatch]);

  useEffect(() => {
    const startDate = new Date(filterByDate);
    const firstDayOfWeek = startDate.getDate() - startDate.getDay();
    const startDateOfWeek = new Date(startDate);
    startDateOfWeek.setDate(firstDayOfWeek);

    const endDate = new Date(filterByDate);
    const lastDayOfWeek = endDate.getDate() + (6 - endDate.getDay());
    const endDateOfWeek = new Date(endDate);
    endDateOfWeek.setDate(lastDayOfWeek);

    const fetchAppointments = async () => {
      await dispatch(ShowAppointmentApi(doctorId, 
        `?startDate=${startDateOfWeek.toISOString().slice(0, 10)}&endDate=${endDateOfWeek.toISOString().slice(0, 10)}`
        ))
    }
    fetchAppointments()
  }, [dispatch, doctorId, daysOfWork, setAppointment, filterByDate])


  return (
    <ShowAppointmentContext.Provider
      value={{
        showSuccessMsg, setShowSuccessMsg,
        showAddModal, setShowAddModal,
        selectedTd, setSelectedTd,
        showDeleteModal, setShowDeleteModal,
        selectedAppointment, setSelectedAppointment,
        filterByDate, setFilterByDate
      }}
    >
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <HeaderAppointment />
      <ToggleTableAppointment />
      {showAddModal && selectedTd &&
        <AddNewAppointment
          modal={showAddModal}
          toggle={() => setShowAddModal(!showAddModal)}
        />
      }
      {selectedAppointment && showDeleteModal && <DeleteAppointment AppointmentData={selectedAppointment} modal={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)}/>}
      <AppointmentsTable />
    </ShowAppointmentContext.Provider>
  );
};

export default ShowAppointments;
