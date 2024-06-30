import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { ShowAppointmentContext } from './types';
import { useParams } from 'react-router';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { PatientInterface } from '../patients/types';
import { AddAppointmentApi } from '../../redux/appointments/appointmentApiCalls';
import { Timeout, formatDate } from '../../functions/functions';
import { ShowFicheApi } from '../../redux/fiches/ficheApiCalls';
import { PatientLab } from '../laboratory/patients/types';
import { ShowPatientLabApi } from '../../redux/laboratory/patients/patientLabApiCalls';
import ShowErrorMsg from '../../HtmlComponents/ShowErrorMsg';
import { ImplantInterface } from '../implants/types';
import { ShowImplantsApi } from '../../redux/implants/implantApiCalls';

interface AddNewAppointmentInterface {
  selectedPatientLab?: PatientLab,
  implantData?: ImplantInterface,
  modal: boolean,
  toggle: () => void,
}

const AddNewAppointment:React.FC<AddNewAppointmentInterface> = ({ modal, toggle, selectedPatientLab, implantData }) => {
  const { patients } = useSelector((state: State) => state.patients)
  const { doctorId, patientId, labId } = useParams()
  const { selectedTd, setShowSuccessMsg, filterByDate } = useContext(ShowAppointmentContext)
  
  const [dateAppointment, setDateAppointment] = useState<any>("")

  useEffect(() => {
    setDateAppointment(selectedTd?.date)
  }, [selectedTd])

  const [patient, setPatient] = useState<any>()
  const [listPatient, setListPatient] = useState<any[]>([])
  const [errors, setErrors] = useState<string[]>([]);

  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: FormEvent) => {
    const startDate = new Date(filterByDate);
    const firstDayOfWeek = startDate.getDate() - startDate.getDay();
    const startDateOfWeek = new Date(startDate);
    startDateOfWeek.setDate(firstDayOfWeek);

    const endDate = new Date(filterByDate);
    const lastDayOfWeek = endDate.getDate() + (6 - endDate.getDay());
    const endDateOfWeek = new Date(endDate);
    endDateOfWeek.setDate(lastDayOfWeek);

    e.preventDefault()
    setLoading(true)
    Object.assign(selectedTd, { patient: patient?.value, patientLab: selectedPatientLab, implantId: implantData?._id })
    try {
      const response = await dispatch(AddAppointmentApi(doctorId, selectedTd, 
        `?startDate=${startDateOfWeek.toISOString().slice(0, 10)}&endDate=${endDateOfWeek.toISOString().slice(0, 10)}`
      ))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setPatient({})
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        patientId && await dispatch(ShowFicheApi(patientId))
        implantData && await dispatch(ShowImplantsApi(`?doctor=${doctorId}`))
        selectedPatientLab?._id && labId && await dispatch(ShowPatientLabApi(labId || ""))
      } else {
        setErrors(response)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    patientId && setPatient({value: patientId})
  }, [patientId])

  useEffect(() => {
    implantData && setPatient({value: implantData.patient?._id})
  }, [implantData])


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
                    <ShowErrorMsg errors={errors} setErrors={setErrors}/>
                    {!patientId && !implantData &&
                      !selectedPatientLab?.consumptionLab?.patient?._id && 
                      <Select 
                        styles={customStyles}
                        value={patient}
                        onChange={(e: any) => setPatient(e)} 
                        options={listPatient} 
                      />
                    }
                    <p className='rounded shadow px-4 py-2 bg-[#EEE] w-full mt-2'>{formatDate(dateAppointment)}</p>
                    <ButtonsForm loading={loading} typeBtn='Ajouter' toggle={toggle} />
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
