import React from 'react'
import ShowAssurances from '../components/assurances/ShowAssurances'
import { useTranslation } from 'react-i18next'

const Assurances = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='text-center text-3xl'>{t("Assurances")}</h1>
      <ShowAssurances />
    </div>
  )
}

export default Assurances
