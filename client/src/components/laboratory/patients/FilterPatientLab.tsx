import React, { useContext } from 'react'
import { ShowPatientLabContext } from './types'
import { useTranslation } from 'react-i18next'

const FilterPatientLab:React.FC = () => {
  const { typePatientLab, setTypePatientLab } = useContext(ShowPatientLabContext)
  const { t } = useTranslation()
  return (
    <div className='grid grid-cols-2 gap-2 mt-5'>
      <p className={`${!typePatientLab ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypePatientLab(false)}>{t("Patient Non Terminer")}</p>
      <p className={`${typePatientLab ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypePatientLab(true)}>{t("Patient Terminé")}</p>
    </div>
  )
}

export default FilterPatientLab
