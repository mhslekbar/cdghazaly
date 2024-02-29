import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import AddNewPrescription from './AddNewPrescription'
import EditPrescription from './EditPrescriptions'
import DeletePrescription from './DeletePrescriptions'
import DataPrescription from './DataPrescriptions'
import { DefaultPrescriptionInterface, PrescriptionInterface, ShowPrescriptionContext } from './types'
import { ShowPrescriptionApi } from '../../redux/prescriptions/prescriptionApiCalls'


const ShowPrescription:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showEditPrescription, setShowEditPrescription] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionInterface>(DefaultPrescriptionInterface)
  const [showDeletePrescription, setShowDeletePrescription] = useState(false)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchPrescription = async () => {
      await dispatch(ShowPrescriptionApi())
    }
    fetchPrescription()
  }, [dispatch])

  return (
    <ShowPrescriptionContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg,
      showEditPrescription, setShowEditPrescription,
      selectedPrescription, setSelectedPrescription,
      showDeletePrescription, setShowDeletePrescription,
    }}>
      <AddNewPrescription />
      <DataPrescription />
      {showEditPrescription && <EditPrescription PrescriptionData={selectedPrescription} modal={showEditPrescription} toggle={() => setShowEditPrescription(!showEditPrescription)} />}
      {showDeletePrescription && <DeletePrescription PrescriptionData={selectedPrescription} modal={showDeletePrescription} toggle={() => setShowDeletePrescription(!showDeletePrescription)} />}
    </ShowPrescriptionContext.Provider>
  )
}

export default ShowPrescription
