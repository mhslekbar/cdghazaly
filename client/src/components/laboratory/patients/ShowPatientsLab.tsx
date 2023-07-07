import React, { useState } from 'react'
import DataPatientLab from './DataPatientLab'
import FilterPatientLab from './FilterPatientLab'
import { DefaultPatientLab, PatientLab, ShowPatientLabContext } from './types'
import FinishPatientLab from './FinishPatientLab'

const ShowPatientsLab:React.FC = () => {
  const [selectedPatientLab, setSelectedPatientLab] = useState<PatientLab>(DefaultPatientLab)
  const [typePatientLab, setTypePatientLab] = useState(false)
  const [showFinishPatientLab, setShowFinishPatientLab] = useState(false)
  
  return (
    <ShowPatientLabContext.Provider value={{
      selectedPatientLab,
      setSelectedPatientLab,
      typePatientLab, setTypePatientLab,
      showFinishPatientLab, setShowFinishPatientLab
    }}>
      <FilterPatientLab />
      <DataPatientLab />
      {showFinishPatientLab && 
        <FinishPatientLab modal={showFinishPatientLab} toggle={() => setShowFinishPatientLab(!showFinishPatientLab)} />
      }
    </ShowPatientLabContext.Provider>
  )
}

export default ShowPatientsLab
