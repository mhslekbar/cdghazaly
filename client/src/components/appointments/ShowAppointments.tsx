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

const ShowAppointments: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTd, setSelectedTd] = useState<any>()
  const [selectedAppointment, setSelectedAppointment] = useState<any>();
  const [filterByDate, setFilterByDate] = useState<Date>(new Date())

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchAppointments = async () => {
      await dispatch(ShowAppointmentApi(doctorId))
    }
    fetchAppointments()
  }, [dispatch, doctorId])

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
  }, [dispatch, doctorId])

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
