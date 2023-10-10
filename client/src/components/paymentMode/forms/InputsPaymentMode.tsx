import React, { useContext } from 'react'
import { DataPaymentModeContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'

const InputsPaymentMode = () => {
  const { 
    name, setName,
    code, setCode,
   } = useContext(DataPaymentModeContext)
  return (
    <>
      <InputElement name="Nom" placeholder="Donner le Nom.." value={name} setValue={setName}/>
      <InputElement name="Code" placeholder="Donner le Code.." value={code} setValue={setCode}/>
    </>
  )
}

export default InputsPaymentMode