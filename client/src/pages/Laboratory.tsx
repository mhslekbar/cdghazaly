import React from 'react'
import ShowLaboratory from '../components/laboratory/ShowLaboratory'
import { useTranslation } from 'react-i18next'

const Laboratory:React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='text-center text-3xl'>{t("Laboratoires")}</h1> 
      <ShowLaboratory />
    </div>
  )
}

export default Laboratory
