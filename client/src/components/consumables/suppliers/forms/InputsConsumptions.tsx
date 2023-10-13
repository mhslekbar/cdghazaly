import React, { useContext } from 'react'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { DataSuppliersContext } from '../types'
import { useTranslation } from 'react-i18next'

const InputsSuppliers:React.FC = () => {
  const { 
    name, setName,
    phone, setPhone,
  } = useContext(DataSuppliersContext)

  const { t } = useTranslation()

  return (
    <>
      <InputElement name={t("Nom")} value={name} setValue={setName} />
      <InputElement name={t("Telephone")} value={phone} setValue={setPhone} />
    </>
  )
}

export default InputsSuppliers
