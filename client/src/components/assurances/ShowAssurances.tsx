import React, { useState } from 'react'
import DataAssurances from './DataAssurances'
import { AssuranceInterface, DefaultAssuranceInterface, ShowAssurancesContext } from './types'
import AddAssurance from './AddAssurance'
import SuccessMsg from '../../Messages/SuccessMsg'
import EditAssurance from './EditAssurance'
import DeleteAssurance from './DeleteAssurance'
import ManageAssurance from './ManageAssurance'
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa'
import { useNavigate, useParams  } from 'react-router'

const ShowAssurances:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAssurance, setSelectedAssurance] = useState<AssuranceInterface>(DefaultAssuranceInterface)
  const [selectedDoctor, setSelectedDoctor] = useState<any[]>([]);
  const [hideDataAssurance, setHideDataAssurance] = useState(false)
  const { AssId } = useParams()
  const navigate = useNavigate()

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
      hideDataAssurance, setHideDataAssurance,
      showAddModal, setShowAddModal
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/> }

      {showAddModal && <AddAssurance modal={showAddModal} toggle={() => setShowAddModal(!showAddModal)} /> }
      
      {!AssId && <div className="flex justify-start gap-2 mt-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
        <button className="p-2 rounded btn-main" onClick={() => setShowAddModal(!showAddModal)}>
          <FaPlus />
        </button>
      </div>}

      {AssId ? <FaChevronCircleLeft className='text-main mt-2' style={{ fontSize: "30px" }} onClick={() => { 
        navigate(`/assurance`)
        setSelectedAssurance(DefaultAssuranceInterface)
      }} /> : <DataAssurances />} 
      
      {showEditModal && selectedAssurance._id && <EditAssurance AssuranceData={selectedAssurance} modal={showEditModal}  toggle={() => setShowEditModal(!showEditModal)} />}
      {showDeleteModal && selectedAssurance._id && <DeleteAssurance AssuranceData={selectedAssurance} modal={showDeleteModal}  toggle={() => setShowDeleteModal(!showDeleteModal)} />}
      {/* {selectedAssurance.name.length > 0 && <ManageAssurance Assurance={selectedAssurance} /> } */}
      
      {AssId && <ManageAssurance Assurance={selectedAssurance} />}

    </ShowAssurancesContext.Provider>
  )
}

export default ShowAssurances
