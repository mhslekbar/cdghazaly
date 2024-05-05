import React from 'react'
import { useTranslation } from 'react-i18next'
import ShowImplants from '../components/implants/ShowImplants'

const Implants:React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className='text-center text-4xl'>{t("Implants")}</h1>
      <ShowImplants />
    </div>
  )
}

export default Implants
