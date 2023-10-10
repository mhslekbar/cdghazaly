import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowPaymentModeApi } from '../../redux/paymentMode/paymentModeApiCalls'
import DataPaymentMode from './DataPaymentMode'
import AddPaymentMode from './AddPaymentMode'
import SuccessMsg from '../../Messages/SuccessMsg'
import { DefaultPaymentModeInterface, PaymentModeInterface, ShowPaymentModeContext } from './types'
import EditPaymentMode from './EditPaymentMode'
import DeletePaymentMode from './DeletePaymentMode'

const ShowPaymentMode = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<PaymentModeInterface>(DefaultPaymentModeInterface)
  
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchPaymentMode = async () => {
      await dispatch(ShowPaymentModeApi())
    }
    fetchPaymentMode()
  }, [dispatch])


  return (
    <ShowPaymentModeContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg,
      showEditModal, setShowEditModal,
      showDeleteModal, setShowDeleteModal,
      selectedPaymentMode, setSelectedPaymentMode
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)}/> }

      <AddPaymentMode />
      <DataPaymentMode />

      {selectedPaymentMode._id && showEditModal && 
        <EditPaymentMode 
          modal={showEditModal}
          toggle={() => setShowEditModal(!showEditModal)}
          paymentModeData={selectedPaymentMode} 
        />
      }
      {selectedPaymentMode._id && showDeleteModal && 
        <DeletePaymentMode 
          modal={showDeleteModal}
          toggle={() => setShowDeleteModal(!showDeleteModal)}
          paymentModeData={selectedPaymentMode} 
        />
      }
    </ShowPaymentModeContext.Provider>
  )
}

export default ShowPaymentMode