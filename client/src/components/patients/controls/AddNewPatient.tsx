import React, { FormEvent, useContext, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { DefaultDataInputsPatientContext, ShowPatientsContext } from '../types';
import InputsPatient from '../forms/InputsPatient';
import { UserData } from '../../../requestMethods';
import { AddPatientsApi } from '../../../redux/patients/patientApiCalls';
import { useDispatch } from 'react-redux';
import { Timeout, hideMsg } from '../../../functions/functions';
import { DefaultUserInterface, UserInterface } from '../../users/types';

interface AddNewPatientInterface {
  modal: boolean,
  toggle: () => void
}

const AddNewPatient:React.FC<AddNewPatientInterface> = ({ modal, toggle }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsApp, setWhatsApp] = useState("+222")
  const [address, setAddress] = useState("")
  const [healthyCondition, setHealthyCondition] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState("")
  const [consultation, setConsultation] = useState(true)
  const [doctor, setDoctor] = useState<UserInterface[]>([DefaultUserInterface])
  const [paymentMethod, setPaymentMethod] = useState("")

  const [showAssurance, setShowAssurance] = useState(false)
  const [AssuranceCompany, setAssuranceCompany] = useState("")

  const [selectedDoctor, setSelectedDoctor] = useState<UserInterface[]>(doctor)

  const [RegNoProfessional, setRegNoProfessional] = useState("")
  const [supported, setSupported] = useState("")
  const [percentage, setPercentage] = useState("")

  const [errors, setErrors] = useState<string[]>([]);
  const { setShowSuccessMsg } = useContext(ShowPatientsContext)
  const dispatch: any = useDispatch()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const Doctor: any = doctor
    const data = {
      user: UserData()._id,
      doctor: Doctor._id,
      name,
      contact: {phone, whatsApp},
      HealthCondition: healthyCondition,
      yearOfBirth,
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
      const response = await dispatch(AddPatientsApi(data))
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
    } catch(err) {
      console.log("ss: ", err)
    }
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
      selectedDoctor, setSelectedDoctor,
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
                    <InputsPatient typeModal="Ajouter" />
                    <ButtonsForm toggle={toggle} typeBtn='Ajouter' />
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

export default AddNewPatient
