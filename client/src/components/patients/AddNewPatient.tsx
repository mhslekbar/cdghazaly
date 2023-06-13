import React, { FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../HtmlComponents/ButtonsForm';
import { DefaultDataInputsPatientContext } from './types';
import InputsPatient from './forms/InputsPatient';

const AddNewPatient:React.FC = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsApp, setWhatsApp] = useState("+222")
  const [address, setAddress] = useState("")
  const [healthyCondition, setHealthyCondition] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState("")
  const [social, setSocial] = useState(false)
  const [consultation, setConsultation] = useState(true)
  const [doctor, setDoctor] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const data = {
      name,
      phone,
      whatsApp,
      address,
      healthyCondition,
      yearOfBirth,
      social,
      consultation,
      doctor,
      paymentMethod
    }
    console.log("data: ", data)
  }

  return (
    <DefaultDataInputsPatientContext.Provider value={{
      name, setName,
      phone, setPhone,
      whatsApp, setWhatsApp,
      address, setAddress,
      healthyCondition, setHealthyCondition,
      yearOfBirth, setYearOfBirth,
      social, setSocial,
      consultation, setConsultation,
      doctor, setDoctor,
      paymentMethod, setPaymentMethod
    }}>
        <button className="p-2 rounded bg-main text-white mb-2" onClick={toggle}>
          <FaPlus />
        </button>
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
                    <InputsPatient />
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
