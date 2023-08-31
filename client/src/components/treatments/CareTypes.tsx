import React, { useContext } from 'react'
import { ShowTreatmentContext } from './ShowTreatments'
import { careTypeInterface } from './types'

const CareTypes:React.FC = () => {
  const { selectedType, setSelectedType } = useContext(ShowTreatmentContext)
  
  const types = [
    {type: "soins",   name: "Soins"},
    {type: "prothese", name: "Prothese"},
    {type: "gencive",  name: "Soins gencive"},
    {type: "pediatre", name: "Soins pediatre"},
    {type: "bouche",   name: "Soins de bouche"},
    {type: "conservative", name: "conservateur"},
  ]

  return (
    <div className='bg-white grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 rounded border shadow mt-2 md:font-bold xs:font-normal text-center'>
      {types.map((type: careTypeInterface, index) => (
        <span key={index} className={`px-4 py-2 xs:text-xs md:text-md border-r border-b ${selectedType.name === type.name ? "bg-main" : ""}`} onClick={() => setSelectedType(type)}>{type.name}</span>
      ))}
    </div>
  )
}

export default CareTypes
