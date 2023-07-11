import React, { useState } from 'react'
import DataAssurances from './DataAssurances'
import { AssuranceInterface, DefaultAssuranceInterface, ShowAssurancesContext } from './types'
import AddAssurance from './AddAssurance'
import SuccessMsg from '../../Messages/SuccessMsg'
import EditAssurance from './EditAssurance'
import DeleteAssurance from './DeleteAssurance'
import ManageAssurance from './ManageAssurance'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { useParams } from 'react-router'

const ShowAssurances:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAssurance, setSelectedAssurance] = useState<AssuranceInterface>(DefaultAssuranceInterface)
  const [selectedDoctor, setSelectedDoctor] = useState<any[]>([]);
  const [hideDataAssurance, setHideDataAssurance] = useState(false)
  const { AssId } = useParams()
  return (
    <ShowAssurancesContext.Provider value={{
      showSuccessMsg,
      setShowSuccessMsg,
      showEditModal, 
      setShowEditModal,
      showDeleteModal, 
      setShowDeleteModal,
      selectedAssurance,
      setSelectedAssurance,
      selectedDoctor, setSelectedDoctor,
      hideDataAssurance, setHideDataAssurance
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/> }
      <AddAssurance />
      
      {hideDataAssurance ? <FaChevronCircleLeft className='text-main mt-2' style={{ fontSize: "22px" }} onClick={() => setHideDataAssurance(false)} /> : <DataAssurances />}
      {showEditModal && selectedAssurance && <EditAssurance AssuranceData={selectedAssurance} modal={showEditModal}  toggle={() => setShowEditModal(!showEditModal)} />}
      {showDeleteModal && selectedAssurance && <DeleteAssurance AssuranceData={selectedAssurance} modal={showDeleteModal}  toggle={() => setShowDeleteModal(!showDeleteModal)} />}
      {/* {selectedAssurance.name.length > 0 && <ManageAssurance Assurance={selectedAssurance} /> } */}
      {AssId && <ManageAssurance Assurance={selectedAssurance} /> }
    </ShowAssurancesContext.Provider>
  )
}

export default ShowAssurances
