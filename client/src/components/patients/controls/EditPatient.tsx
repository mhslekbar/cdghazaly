import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { DefaultDataInputsPatientContext, PatientInterface, ShowPatientsContext } from '../types';
import InputsPatient from '../forms/InputsPatient';
import { UserData, get } from '../../../requestMethods';
import { useDispatch } from 'react-redux';
import { Timeout, hideMsg } from '../../../functions/functions';
import { EditPatientsApi } from '../../../redux/patients/patientApiCalls';
import { UserInterface } from '../../users/types';

interface EditPatientInterface {
  patientData: PatientInterface,
  modal: boolean,
  toggle: () => void
}

const EditPatient:React.FC<EditPatientInterface> = ({ patientData, modal, toggle }) => {
  const [name, setName] = useState(patientData.name)
  const [phone, setPhone] = useState(patientData.contact.phone)
  const [whatsApp, setWhatsApp] = useState(patientData.contact.whatsApp)
  const [address, setAddress] = useState(patientData.address)
  const [healthyCondition, setHealthyCondition] = useState(patientData.HealthCondition)
  const [yearOfBirth, setYearOfBirth] = useState(patientData.dob)
  const [consultation, setConsultation] = useState(true)
  const [doctor, setDoctor] = useState<UserInterface[]>(patientData.doctor)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [showAssurance, setShowAssurance] = useState(patientData.assurance?.society.length > 0 ? true : false)
  const [AssuranceCompany, setAssuranceCompany] = useState(patientData.assurance?.society)

  const [RegNoProfessional, setRegNoProfessional] = useState(patientData.assurance?.professionalId)
  const [supported, setSupported] = useState("")
  const [percentage, setPercentage] = useState(patientData.assurance?.percentCovered)

  const [selectedDoctor, setSelectedDoctor] = useState<UserInterface[]>(patientData.doctor)

  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowPatientsContext)
  const dispatch: any = useDispatch()


  useEffect(() => {
    const fetchPayment = async () => {
      const response = await get(`payment?type=consultation&patient=${patientData._id}`)
      const resData = response.data.success
      setSupported(resData[0].supported?.split("/")[0])
    }
    fetchPayment()
  }, [patientData])


  const handleSubmit = async (e: FormEvent) => {
    
    e.preventDefault()
    const data = {
      user: UserData()._id,
      doctor: selectedDoctor,
      name,
      contact: {phone, whatsApp},
      HealthCondition: healthyCondition,
      dob: yearOfBirth,
      assurance: {
        society: AssuranceCompany,
        professionalId: RegNoProfessional,
        percentCovered: Number(percentage)
      },
      address,
      method: paymentMethod,
      supported,
      assure: showAssurance,
      isConsult: consultation
    }

    try {
      const response = await dispatch(EditPatientsApi(patientData._id, data))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        setName("")
        setPhone("")
        setWhatsApp("+222")
        setAddress("")
        setHealthyCondition("")
        setYearOfBirth("")
        setConsultation(true)
        setPaymentMethod("")
        setShowAssurance(false)
        setAssuranceCompany("")
        setRegNoProfessional("")
        setSupported("")
        setPercentage("")
      } else {
        setErrors(response)
      }
    } catch {}
  }

  return (
    <DefaultDataInputsPatientContext.Provider value={{
      name, setName,
      phone, setPhone,
      whatsApp, setWhatsApp,
      address, setAddress,
      healthyCondition, setHealthyCondition,
      yearOfBirth, setYearOfBirth,
      consultation, setConsultation,
      doctor, setDoctor,
      paymentMethod, setPaymentMethod,
      showAssurance, setShowAssurance,
      AssuranceCompany, setAssuranceCompany,
      RegNoProfessional, setRegNoProfessional,
      supported, setSupported,
      percentage, setPercentage,
      selectedDoctor, setSelectedDoctor
    }}>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg" style={{
                minWidth: "800px"
              }}>
                <div className="mt-3">
                  {/* <h1 className='text-2xl text-gray-700 text-center font-bold'>Nouveau Consultation</h1> */}
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
                    <InputsPatient typeModal="Edit" />
                    <ButtonsForm toggle={toggle} typeBtn='Modifier' />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultDataInputsPatientContext.Provider>
  );
}

export default EditPatient
