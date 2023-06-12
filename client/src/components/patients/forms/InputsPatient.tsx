import React, { useContext } from 'react'
import { DefaultDataInputsPatientContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'

const InputsPatient = () => {
  const { 
    name, setName,
    phone, setPhone,
    whatsApp, setWhatsApp,
    address, setAddress,
    healthyCondition, setHealthyCondition,
    yearOfBirth, setYearOfBirth
  } = useContext(DefaultDataInputsPatientContext)

  return (
    <React.Fragment>
      <div className='grid grid-cols-2 gap-2'>
        <InputElement name="Nom" id="name" placeholder='Nom du patient ...' value={name} setValue={setName}/> 
        <InputElement name="Telephone" id="phone" placeholder='Numero de telephone' value={phone} setValue={setPhone}/> 
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <InputElement name="Address" id="address" placeholder='Address du patient' value={address} setValue={setAddress}/> 
        <InputElement name="WhatsApp" id="whatsApp" placeholder='Whatsapp' value={whatsApp} setValue={setWhatsApp}/> 
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <InputElement name="Etat de Santé" id="healthyCondition" placeholder='Etat de santé' value={healthyCondition} setValue={setHealthyCondition}/> 
        <InputElement name="Année de naissance" id="yearOfBirth" placeholder='Année de naissance' value={yearOfBirth} setValue={setYearOfBirth}/> 
      </div>
    </React.Fragment>
  )
}

export default InputsPatient
