import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ShowAppointmentApi } from '../../../../redux/appointments/appointmentApiCalls';
import { ShowSetAppointApi } from '../../../../redux/setAppoint/setAppointApiCalls';
import { ShowAppointmentContext } from '../../../appointments/types';
import SuccessMsg from '../../../../Messages/SuccessMsg';
import HeaderAppointment from '../../../appointments/HeaderAppointment';
import ToggleTableAppointment from '../../../appointments/ToggleTableAppointment';
import AddNewAppointment from '../../../appointments/AddNewAppointment';
import DeleteAppointment from '../../../appointments/DeleteAppointment';
import AppointmentsTable from '../../../appointments/AppointmentsTable/TableAppointments';
import { PatientLab } from '../../../laboratory/patients/types';

interface AppointmentModalInterface {
  selectedPatientLab?: PatientLab,
  modal: boolean,
  toggle: () => void,
}

const AppointmentModal:React.FC<AppointmentModalInterface> = ({ modal, toggle, selectedPatientLab }) => {
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

  return (
    <ShowAppointmentContext.Provider
      value={{
        showSuccessMsg,
        setShowSuccessMsg,
        showAddModal,
        setShowAddModal,
        selectedTd, setSelectedTd,
        showDeleteModal, setShowDeleteModal,
        selectedAppointment, setSelectedAppointment,
        filterByDate, setFilterByDate
      }}
    >
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg" style={{ minWidth: "1200px" }}>
                <div className="mt-3">
                {showSuccessMsg && (
                  <SuccessMsg
                    modal={showSuccessMsg}
                    toggle={() => setShowSuccessMsg(!showSuccessMsg)}
                  />
                )}
                <HeaderAppointment selectedPatientLab={selectedPatientLab}/>
                <ToggleTableAppointment />
                {showAddModal && selectedTd &&
                  <AddNewAppointment
                    selectedPatientLab={selectedPatientLab}
                    modal={showAddModal}
                    toggle={() => setShowAddModal(!showAddModal)}
                  />
                }
                {selectedAppointment && showDeleteModal && <DeleteAppointment AppointmentData={selectedAppointment} modal={showDeleteModal} toggle={() => setShowDeleteModal(!showDeleteModal)}/>}
                <AppointmentsTable />

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ShowAppointmentContext.Provider>

  );
}

export default AppointmentModal
