import React, { useEffect, useState } from 'react'
import DataDevis from './DataDevis'
import SelectDevis from './controls/SelectDevis'
import { DefaultDevisInterface, DevisInterface, ShowDevisInterfaceContext } from './types'
import AddNewDevis from './controls/AddNewDevis'
import { FaEdit, FaPrint } from 'react-icons/fa'
import { MdRemoveCircle } from 'react-icons/md'
import DeleteDevis from './controls/DeleteDevis'
import SuccessMsg from '../../../Messages/SuccessMsg'
import EditDevis from './controls/EditDevis'
import { ShowDevisApi } from '../../../redux/devis/devisApiCalls'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'

const ShowDevis:React.FC = () => {
  const [selectedDevis, setSelectedDevis] = useState<DevisInterface>(DefaultDevisInterface)
  const [showTeethBoard, setShowTeethBoard] = useState(false)
  const [showEditDevis, setShowEditDevis] = useState(false)
  const [showDeleteDevis, setShowDeleteDevis] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [isShowingAllDevis, setIsShowingAllDevis] = useState(false);

  const handleShowDelete = () => {
    setShowDeleteDevis(!showDeleteDevis)
  }
  const { patientId } = useParams()
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchDevis = async () => {
      dispatch(ShowDevisApi(patientId));
    };
    fetchDevis();
  }, [dispatch, patientId]);

  return (
    <ShowDevisInterfaceContext.Provider value={{
      selectedDevis, setSelectedDevis,
      showTeethBoard, setShowTeethBoard,
      showEditDevis, setShowEditDevis,
      showDeleteDevis, setShowDeleteDevis,
      showSuccessMsg, setShowSuccessMsg,
      isShowingAllDevis, setIsShowingAllDevis
    }}>
    {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
    <div className='grid grid-cols-6 mt-4'>
      <div className='flex justify-between'>
        <AddNewDevis />
        <SelectDevis />
      </div>
      <DataDevis />
      {selectedDevis && 
        <div className='ml-4'>
          <FaPrint className='text-main' style={{
            fontSize: "28px"
          }} 
          onClick={() => window.print()}
          />
          <FaEdit 
            className='text-blue' 
            style={{
              fontSize: "28px"
            }}
            onClick={() => {
              setShowEditDevis(!showEditDevis)
              setSelectedDevis(selectedDevis)
            }}  
          />
          <MdRemoveCircle 
            className='text-red'
            style={{
              fontSize: "28px"
            }}
            onClick={() => handleShowDelete()}
          />
        </div>
      }
      {showEditDevis && 
        <EditDevis DevisData={selectedDevis} modal={showEditDevis} toggle={() => setShowEditDevis(!showEditDevis)} />
      }
      {showDeleteDevis && 
        <DeleteDevis DevisData={selectedDevis} modal={showDeleteDevis} toggle={() => setShowDeleteDevis(!showDeleteDevis)}/>
      }
    </div>
    </ShowDevisInterfaceContext.Provider>
  )
}

export default ShowDevis
