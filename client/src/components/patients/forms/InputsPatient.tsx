import React, { useContext, useEffect, useState } from 'react'
import { DefaultDataInputsPatientContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'
import { InputCheckbox } from '../../../HtmlComponents/InputCheckbox'
import { DefaultUserInterface, UserInterface } from '../../users/types'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { ShowPaymentModeApi } from '../../../redux/paymentMode/paymentModeApiCalls'
import { UserData } from '../../../requestMethods'
import { SelectElement } from '../../../HtmlComponents/SelectElement'
import InputsAssPatients from './InputsAssPatients'
import { formattedDate } from '../../../functions/functions'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

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
  const { paymentModes } = useSelector((state: State) => state.paymentModes)


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
      await dispatch(ShowPaymentModeApi())
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

  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name={t("Nom")} id="name" placeholder={t("Nom du patient")} value={name} setValue={setName} />
        <InputElement name={t("Telephone")} id="phone" placeholder={t("Numero de telephone")} value={phone} setValue={setPhone} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputElement name={t("Address")} id="address" placeholder={t("Address du patient")} value={address} setValue={setAddress} />
        <InputElement name={t("WhatsApp")} id="whatsApp" placeholder={t("Whatsapp")} value={whatsApp} setValue={setWhatsApp} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {typeModal === "Ajouter" ? 
          <InputElement name={t("Année de naissance")} id="yearOfBirth" placeholder={t("Année de naissance")} value={(yearOfBirth)} setValue={setYearOfBirth} />
          :
          <>
            <InputElement name={t("Etat de Santé")} id="healthyCondition" placeholder={t("Etat de santé")} value={healthyCondition} setValue={setHealthyCondition} />
            <InputElement type="date" name={t("Année de naissance")} id="DateOfBith" placeholder={t("Année de naissance")} value={formattedDate(yearOfBirth)} setValue={setYearOfBirth} />
          </>
        }
      </div>
      <div className="grid grid-cols-2 gap-2">
        {typeModal === "Ajouter" ? 
          <InputCheckbox name={t("Consultation")} id="cons" value={consultation} setValue={setConsultation} />
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
              options={ paymentModes
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
