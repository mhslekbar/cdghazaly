import React, { useContext } from 'react'
import { ShowTreatmentContext } from './ShowTreatments'
import { ArrayTypeCare, careTypeInterface } from './types'
import { useTranslation } from 'react-i18next'

const CareTypes:React.FC = () => {
  const { selectedType, setSelectedType } = useContext(ShowTreatmentContext)
    
  const { t } = useTranslation()

  return (
    <div className='bg-white grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 rounded border shadow mt-2 md:font-bold xs:font-normal text-center'>
      {ArrayTypeCare.map((type: careTypeInterface, index) => (
        <span key={index} className={`px-4 py-2 xs:text-xs md:text-md border-r border-b ${selectedType.name === type.name ? "bg-main" : ""}`} onClick={() => setSelectedType(type)}>{t(type.name)}</span>
      ))}
    </div>
  )
}

export default CareTypes
