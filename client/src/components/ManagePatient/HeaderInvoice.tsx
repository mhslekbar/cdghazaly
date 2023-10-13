import React from 'react'
import { PatientInterface } from '../patients/types'
import { RegNo } from '../../functions/functions'
import { useTranslation } from 'react-i18next'

interface HeaderInvoiceInterface {
  PatientInfo: PatientInterface,
  type: string
} 

const HeaderInvoice:React.FC<HeaderInvoiceInterface> = ({ PatientInfo, type }) => {
  const { t } = useTranslation()
  
  return (
    <div className='py-4 bg-white hidden print:block'>
      <h1 className='text-2xl font-bold'>{type}</h1>
      <p>{t("Doss.No")}: {RegNo(PatientInfo.RegNo)}</p>
      <p>{t("Nom")}:  {PatientInfo.name}</p>
    </div>
  )
}

export default HeaderInvoice
