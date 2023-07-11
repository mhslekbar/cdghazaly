import React, { useContext, useEffect, useState } from 'react'
import { DefaultDataInputsPatientContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'
import { InputCheckbox } from '../../../HtmlComponents/InputCheckbox'
import { DefaultUserInterface, UserInterface } from '../../users/types'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { ShowPaymentMethodApi } from '../../../redux/paymentMethods/paymentMethodApiCalls'
import { UserData } from '../../../requestMethods'
import { SelectElement } from '../../../HtmlComponents/SelectElement'
import InputsAssPatients from './InputsAssPatients'
import { formattedDate } from '../../../functions/functions'
import { useParams } from 'react-router'

const InputsPatient = ({ typeModal }: { typeModal?:string }) => {
  const { 
    name, setName,
    phone, setPhone,
    whatsApp, setWhatsApp,
    address, setAddress,
    healthyCondition, setHealthyCondition,
    yearOfBirth, setYearOfBirth,
    consultation, setConsultation,
    doctor, setDoctor,
    paymentMethod, setPaymentMethod,
    selectedDoctor, setSelectedDoctor
  } = useContext(DefaultDataInputsPatientContext)
  
  const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([DefaultUserInterface])
  const [hideChooseDr, setHideChooseDr] = useState(false)
  const { users } = useSelector((state: State) => state.users)
  const { paymentMethods } = useSelector((state: State) => state.paymentMethods)


  useEffect(() => {
    setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  const { doctorId } = useParams()

  useEffect(() => {
    const doctorData = UserData().doctor.cabinet
    setHideChooseDr(!doctorData && true)
    setDoctor(doctorData ? UserData() : ArrayOfDoctors.find(doctor => doctor._id === doctorId) || DefaultUserInterface)
   }, [ArrayOfDoctors, setDoctor, doctorId])

  const dispatch: any = useDispatch()
  
  useEffect(() => {
    const fetchPaymentMethod = async () => {
      await dispatch(ShowPaymentMethodApi())
    }
    fetchPaymentMethod();
  }, [dispatch])

  const handleChangeDoctor = (e: any, user: UserInterface) => {
    if(!e.target.checked){
      setSelectedDoctor(selectedDoctor.filter((doctor: UserInterface) => doctor._id !== user._id))
    } else {
      setSelectedDoctor([...selectedDoctor, user])
    }
  }

  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name="Nom" id="name" placeholder="Nom du patient ..." value={name} setValue={setName} />
        <InputElement name="Telephone" id="phone" placeholder="Numero de telephone" value={phone} setValue={setPhone} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name="Address" id="address" placeholder="Address du patient" value={address} setValue={setAddress} />
        <InputElement name="WhatsApp" id="whatsApp" placeholder="Whatsapp" value={whatsApp} setValue={setWhatsApp} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {typeModal === "Ajouter" ? 
          <InputElement name="Année de naissance" id="yearOfBirth" placeholder="Année de naissance" value={yearOfBirth} setValue={setYearOfBirth} />
          :
          <>
            <InputElement name="Etat de Santé" id="healthyCondition" placeholder="Etat de santé" value={healthyCondition} setValue={setHealthyCondition} />
            <InputElement type="date" name="Année de naissance" id="DateOfBith" placeholder="Date Of Bith" value={formattedDate(yearOfBirth)} setValue={setYearOfBirth} />
          </>
        }
      </div>
      <div className="grid grid-cols-2 gap-2">
        {typeModal === "Ajouter" ? 
          <InputCheckbox name="Consultation" id="cons" value={consultation} setValue={setConsultation} />
          :
          <div className="mt-2 flex justify-start gap-1">
          {ArrayOfDoctors.map((doctor: UserInterface) => 
            <React.Fragment key={doctor._id}>
              <input
                type="checkbox"
                id={doctor._id}
                className={`rounded border px-3 py-2 text-gray-700 focus:outline-none`}
                checked={selectedDoctor.some((user: UserInterface) => user._id === doctor._id)}
                onChange={(e) => handleChangeDoctor(e, doctor)}
              />{" "}
              <label htmlFor={doctor._id} className={`text-gray-700 font-bold w-fit`}>
                {doctor.username}
              </label>
            </React.Fragment>)}
          </div>
        }
      </div>
      {typeModal === "Ajouter" &&
        <div className="grid grid-cols-2 gap-2">
          {consultation && (
            <>
            <SelectElement  
              valueType="string"
              id="paymentMethod"
              value={paymentMethod}
              setValue={setPaymentMethod}
              options={ paymentMethods
                .map((option: any) => ({_id: option._id, name: option.name}))
              }
              defaultOption={<option>cash</option>} 
            />
            {hideChooseDr && (
              <SelectElement valueType="object" id="doctor" value={doctor} setValue={setDoctor} options={ArrayOfDoctors.map((option: any) => ({...option, name: option.username}))} />
            )}
            </>
          )}
        </div>
      }
  
      <InputsAssPatients />
  
    </React.Fragment>
  );
}

export default InputsPatient
