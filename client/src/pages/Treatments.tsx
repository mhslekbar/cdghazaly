import React from 'react'
import ShowTreatments from '../components/treatments/ShowTreatments'
import { useTranslation } from 'react-i18next'

const Treatments:React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='text-center text-3xl'>{t("Traitements")}</h1>
      <ShowTreatments />
    </div>
  )
}

export default Treatments
