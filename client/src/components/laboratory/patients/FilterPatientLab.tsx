import React, { useContext } from 'react'
import { ShowPatientLabContext } from './types'

const FilterPatientLab:React.FC = () => {
  const { typePatientLab, setTypePatientLab } = useContext(ShowPatientLabContext)

  return (
    <div className='grid grid-cols-2 gap-2 mt-5'>
      <p className={`${!typePatientLab ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypePatientLab(false)}>Patient Non Terminer</p>
      <p className={`${typePatientLab ? "bg-main" : "bg-white" } py-2 text-center`} onClick={() => setTypePatientLab(true)}>Patient Terminer</p>
    </div>
  )
}

export default FilterPatientLab
