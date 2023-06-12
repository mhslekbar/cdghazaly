import React from 'react'
import ShowPatients from '../components/patients/ShowPatients'
import { useParams } from 'react-router'
import { PatientTypePath } from '../components/sidebar/types'

const Patients:React.FC = () => {
  const { ptType } = useParams()
  return (
    <div>
      <h1 className='text-center text-3xl mb-4'>
        {ptType === PatientTypePath.CONSULTATION ? "Consultations" : ptType === PatientTypePath.CURRENT ? "Patients En cours" : ptType === PatientTypePath.FINISH ? "Patients Terminer" : "" }
      </h1>
      <ShowPatients />
    </div>
  )
}

export default Patients
