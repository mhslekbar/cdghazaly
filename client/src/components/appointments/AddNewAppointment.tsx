import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { ShowAppointmentContext } from './types';
import { useParams } from 'react-router';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { ShowPatientsApi } from '../../redux/patients/patientApiCalls';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { PatientInterface } from '../patients/types';
import { AddAppointmentApi } from '../../redux/appointments/appointmentApiCalls';
import { Timeout, formatDate, hideMsg } from '../../functions/functions';
import { ShowFicheApi } from '../../redux/fiches/ficheApiCalls';
import { PatientLab } from '../laboratory/patients/types';
import { ShowPatientLabApi } from '../../redux/laboratory/patients/patientLabApiCalls';

interface AddNewAppointmentInterface {
  selectedPatientLab?: PatientLab,
  modal: boolean,
  toggle: () => void,
}

const AddNewAppointment:React.FC<AddNewAppointmentInterface> = ({ modal, toggle, selectedPatientLab }) => {
  const { patients } = useSelector((state: State) => state.patients)
  const { doctorId, patientId, labId } = useParams()
  const { selectedTd, setShowSuccessMsg } = useContext(ShowAppointmentContext)
  
  const [dateAppointment, setDateAppointment] = useState<any>("")

  useEffect(() => {
    setDateAppointment(selectedTd?.date)
  }, [selectedTd])

  const [patient, setPatient] = useState<any>()
  const [listPatient, setListPatient] = useState<any[]>([])
  const [errors, setErrors] = useState<string[]>([]);

  const dispatch: any = useDispatch()

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? '#00b894' : "#FFF",
      borderBottom: "2px solid #DEE",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused && "none",
      outline: state.isFocused && "none",
    }),
  };
  
  useEffect(() => {
    setListPatient(patients.map((data: PatientInterface) => ({value: data._id, label: data.name})))
  }, [patients])

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi())
    }
    fetchPatient()
  }, [dispatch])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    Object.assign(selectedTd, { patient: patient?.value, patientLab: selectedPatientLab})
    try {
      const response = await dispatch(AddAppointmentApi(doctorId, selectedTd))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setPatient({})
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        patientId && await dispatch(ShowFicheApi(patientId))
        selectedPatientLab?._id && labId && await dispatch(ShowPatientLabApi(labId || ""))
      } else {
        setErrors(response)
      }
    } catch { }
  }

  useEffect(() => {
    patientId && setPatient({value: patientId})
  }, [patientId])

  useEffect(() => {
    const patient = selectedPatientLab?.consumptionLab?.patient
    patient?._id && setPatient({value: patient?._id})
  }, [selectedPatientLab])
  

  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSubmit}
                  >
                  {errors.length > 0 &&
                    errors.map((err, index) => (
                      <p
                        className="p-3 my-2 rounded bg-red text-white msg"
                        key={index}
                        onClick={(e) => hideMsg(e, errors, setErrors)}
                      >
                        {err}
                      </p>
                    ))}
                    {!patientId && !selectedPatientLab?.consumptionLab?.patient?._id && <Select styles={customStyles} value={patient} onChange={(e: any) => setPatient(e)} options={listPatient} />}
                    <p className='rounded shadow px-4 py-2 bg-[#EEE] w-full mt-2'>{formatDate(dateAppointment)}</p>
                    <ButtonsForm typeBtn='Ajouter' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddNewAppointment
