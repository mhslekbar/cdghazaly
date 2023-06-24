import React, { useContext, useEffect, useState } from 'react'
import { DefaultPatientInterface, PatientInterface, ShowPatientsContext } from '../../patients/types'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'

const ControlReturnPatient:React.FC = () => {
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  const [patientData, setPatientData] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setPatientData(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])
  
  const { showReturnPatient, setShowReturnPatient, setSelectedPatient } = useContext(ShowPatientsContext);
  
  return (
    <button className="p-2 rounded bg-yellow text-white mb-2 ml-2" onClick={() => {
      setSelectedPatient(patientData)
      setShowReturnPatient(!showReturnPatient)
    }}>
      <FaArrowAltCircleRight />
    </button>    
  )
}

export default ControlReturnPatient
