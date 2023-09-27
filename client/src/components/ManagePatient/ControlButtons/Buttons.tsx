import React, { useEffect, useState } from 'react'
import ControlEditPatient from './ControlEditPatient'
import ControlDeletePatient from './ControlDeletePatient'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { DefaultPatientInterface, PatientInterface } from '../../patients/types'
import ControlPassPatient from './ControlPassPatient'
import ControlFinishPatient from './ControlFinishPatient'
import ControlReturnPatient from './ControlReturnPatient'

const Buttons:React.FC = () => {
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)
  const [showFilter, setShowFilter] = useState<PatientInterface>(DefaultPatientInterface)
  
  useEffect(() => {
    setShowFilter(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])

  return (
    <div>
      <ControlEditPatient />
      {<ControlDeletePatient />}
      {/* {!showFilter?.RegNo && <ControlDeletePatient />} */}
      {!showFilter?.archive && !showFilter?.RegNo ? <ControlPassPatient /> : ""}
      {(showFilter?.RegNo && !showFilter?.finish) ? <ControlFinishPatient /> : ""}
      {(showFilter?.RegNo && showFilter?.finish) ? <ControlReturnPatient /> : ""}
    </div>
  )
}

export default Buttons
