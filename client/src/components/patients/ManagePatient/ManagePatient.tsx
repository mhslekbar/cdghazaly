import React from 'react'
import { useParams } from 'react-router'

const ManagePatient:React.FC = () => {
  const { doctorId } = useParams()
  return (
    <div>
      Hello Manage {doctorId}
    </div>
  )
}

export default ManagePatient
