import React, { useContext, useEffect, useState } from 'react'
import { DefaultPatientInterface, PatientInterface, ShowPatientsContext } from '../../patients/types'
import { FaEdit } from 'react-icons/fa'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'

const ControlEditPatient = () => {
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  const [patientData, setPatientData] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setPatientData(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])
  
  const { showEditPatient, setShowEditPatient, setSelectedPatient } = useContext(ShowPatientsContext)
  return (
    <button className="p-2 rounded bg-blue text-white mb-2" onClick={() => {
      setSelectedPatient(patientData)
      setShowEditPatient(!showEditPatient)
    }}>
      <FaEdit />
    </button>    
  )
}

export default ControlEditPatient
