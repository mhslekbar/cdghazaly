import React, { useContext } from 'react'
import { DataPaymentModeContext } from '../types'
import { InputElement } from '../../../HtmlComponents/InputElement'
import { useTranslation } from 'react-i18next'

const InputsPaymentMode = () => {
  const { 
    name, setName,
    code, setCode,
  } = useContext(DataPaymentModeContext)
  
  const { t } = useTranslation()
  
  return (
    <>
      <InputElement name={t("Nom")} placeholder={t("Donner le Nom")} value={name} setValue={setName}/>
      <InputElement name={t("Code")} placeholder={t("Donner le Code")} value={code} setValue={setCode}/>
    </>
  )
}

export default InputsPaymentMode