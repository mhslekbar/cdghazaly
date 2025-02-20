import React from 'react'
import { PatientInterface } from '../patients/types'
import { RegNo } from '../../functions/functions'
import { useTranslation } from 'react-i18next'
import { companyName } from '../../requestMethods'

interface props {
  PatientInfo: PatientInterface,
  type: string
} 

const HeaderInvoice:React.FC<props> = ({ PatientInfo, type }) => {
  const { t } = useTranslation()
  
  return (
    <section>
      {companyName === "chumanite" && <img className="hidden print:block" src="/assets/chumanite/header.jpg" alt="header" />}
      {companyName === "cdeloumma" && <img className="hidden print:block" src="/assets/cdeloumma/header.jpg" alt="header" />}
      <div className='py-4 bg-white hidden print:block'>
        <h1 className='text-2xl font-bold'>{type}</h1>
        <p>{t("Doss.No")}: {RegNo(PatientInfo.RegNo)}</p>
        <p>{t("Nom")}:  {PatientInfo.name}</p>
      </div>
    </section>
  )
}

export default HeaderInvoice
