import React, { useState } from 'react'
import DataPatientLab from './DataPatientLab'
import FilterPatientLab from './FilterPatientLab'
import { DefaultPatientLab, PatientLab, ShowPatientLabContext } from './types'
import FinishPatientLab from './FinishPatientLab'
import AppointmentModal from '../../ManagePatient/Fiches/controls/AppointmentModal'

const ShowPatientsLab:React.FC = () => {
  const [selectedPatientLab, setSelectedPatientLab] = useState<PatientLab>(DefaultPatientLab)
  const [typePatientLab, setTypePatientLab] = useState(false)
  const [showFinishPatientLab, setShowFinishPatientLab] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  
  return (
    <ShowPatientLabContext.Provider value={{
      selectedPatientLab,
      setSelectedPatientLab,
      typePatientLab, setTypePatientLab,
      showFinishPatientLab, setShowFinishPatientLab,
      showAppointmentModal, setShowAppointmentModal
    }}>
      <FilterPatientLab />
      <DataPatientLab />
      {showFinishPatientLab && 
        <FinishPatientLab modal={showFinishPatientLab} toggle={() => setShowFinishPatientLab(!showFinishPatientLab)} />
      }
      {showAppointmentModal && 
        <AppointmentModal selectedPatientLab={selectedPatientLab} modal={showAppointmentModal} toggle={() => setShowAppointmentModal(!showAppointmentModal)} />
      }
    </ShowPatientLabContext.Provider>
  )
}

export default ShowPatientsLab
