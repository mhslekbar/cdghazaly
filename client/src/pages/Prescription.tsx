import React from 'react'
import { useTranslation } from 'react-i18next'
import ShowPrescription from '../components/prescriptions/ShowPrescriptions'

const Prescription:React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className='text-center text-4xl'>{t("Ordonnances")}</h1>
      <ShowPrescription />
    </div>
  )
}

export default Prescription
