import React from 'react'
import ShowPatients from '../components/patients/ShowPatients'
import { useParams } from 'react-router'
import { PatientTypePath } from '../components/sidebar/types'
import { useTranslation } from 'react-i18next'

const Patients:React.FC = () => {
  const { ptType } = useParams()
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='text-center text-3xl mb-4'>
        {ptType === PatientTypePath.CONSULTATION ? t("Consultations") : ptType === PatientTypePath.CURRENT ? t("Patients En cours") : ptType === PatientTypePath.FINISH ? t("Patients Terminé") : "" }
      </h1>
      <ShowPatients />
    </div>
  )
}

export default Patients
