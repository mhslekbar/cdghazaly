import React, { useContext } from 'react'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { DataSuppliersContext } from '../types'

const InputsSuppliers:React.FC = () => {
  const { 
    name, setName,
    phone, setPhone,
  } = useContext(DataSuppliersContext)

  return (
    <>
      <InputElement name="Nom" value={name} setValue={setName} />
      <InputElement name="Telephone" value={phone} setValue={setPhone} />
    </>
  )
}

export default InputsSuppliers
