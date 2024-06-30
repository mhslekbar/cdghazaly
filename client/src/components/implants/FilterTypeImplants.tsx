import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ShowImplantContext } from './types'

const FilterTypeImplants:React.FC = () => {
  const { typeFilterImplant, setTypeFilterImplant } = useContext(ShowImplantContext)
  const { t } = useTranslation()
  return (
    <div className='grid grid-cols-2 gap-2 mt-5'>
      <p className={`${!typeFilterImplant ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypeFilterImplant(false)}>{t("Implants Non Terminer")}</p>
      <p className={`${typeFilterImplant ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypeFilterImplant(true)}>{t("Implants Terminé")}</p>
    </div>
  )
}

export default FilterTypeImplants
