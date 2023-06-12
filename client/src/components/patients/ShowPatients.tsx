import React, { useState } from 'react'
import DataPatients from './DataPatients'
import TypeFilterPatients from './TypeFilterPatients'
import { ShowPatientsContext } from './types'
import AddNewPatient from './AddNewPatient'


const ShowPatients:React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("")

  return (
    <ShowPatientsContext.Provider value={{
      selectedFilter, setSelectedFilter
    }}>
      <TypeFilterPatients />
      <AddNewPatient />
      <DataPatients />
    </ShowPatientsContext.Provider>
  )
}

export default ShowPatients
