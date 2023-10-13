import React from 'react'
import ShowStatistics from '../components/statistics/ShowStatistics'
import { useTranslation } from 'react-i18next'

const Statistics:React.FC = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1 className='text-center text-3xl'>{t("Statistiques Financières")}</h1> 
      <ShowStatistics />
    </div>
  )
}

export default Statistics
