import React from 'react'
import ShowConsumables from '../components/consumables/ShowConsumables'
import { useTranslation } from 'react-i18next'

const Consumables:React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className='text-center text-4xl'>{t("Consommables")}</h1>
      <ShowConsumables />
    </div>
  )
}

export default Consumables
