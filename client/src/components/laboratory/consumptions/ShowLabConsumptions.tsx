import React, { useContext } from 'react'
import { ShowLaboratoryContext } from '../ShowLaboratory'

const ShowLabConsumptions = () => {
  const { selectedDoctorLab } = useContext(ShowLaboratoryContext)
  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-gray-700 mt-2'>{selectedDoctorLab.username}</h1>
        Hello ShowLabConsumptions
    </div>
  )
}

export default ShowLabConsumptions
