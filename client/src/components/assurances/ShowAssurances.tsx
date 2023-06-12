import React, { useState } from 'react'
import DataAssurances from './DataAssurances'
import { AssuranceInterface, DefaultAssuranceInterface, ShowAssurancesContext } from './types'
import AddAssurance from './AddAssurance'
import SuccessMsg from '../../Messages/SuccessMsg'
import EditAssurance from './EditAssurance'
import DeleteAssurance from './DeleteAssurance'
import ManageAssurance from './ManageAssurance'


const ShowAssurances:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAssurance, setSelectedAssurance] = useState<AssuranceInterface>(DefaultAssuranceInterface)

  return (
    <ShowAssurancesContext.Provider value={{
      showSuccessMsg,
      setShowSuccessMsg,
      showEditModal, 
      setShowEditModal,
      showDeleteModal, 
      setShowDeleteModal,
      selectedAssurance,
      setSelectedAssurance
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/> }
      <AddAssurance />
      <DataAssurances />
      {showEditModal && selectedAssurance && <EditAssurance AssuranceData={selectedAssurance} modal={showEditModal}  toggle={() => setShowEditModal(!showEditModal)} />}
      {showDeleteModal && selectedAssurance && <DeleteAssurance AssuranceData={selectedAssurance} modal={showDeleteModal}  toggle={() => setShowDeleteModal(!showDeleteModal)} />}
      {selectedAssurance.name.length > 0 && <ManageAssurance Assurance={selectedAssurance} /> }
    </ShowAssurancesContext.Provider>
  )
}

export default ShowAssurances
