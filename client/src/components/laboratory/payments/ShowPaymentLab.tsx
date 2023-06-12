import React, { useContext, useState } from 'react'
import DataLabPayment from './DataPaymentLab'
import AddPaymentLab from './AddPaymentLab'
import { ShowLabPaymentsContext, DefaultPaymentLabType, PaymentLabType } from './types'
import EditPaymentLab from './EditPaymentLab'
import DeletePaymentLab from './DeletePaymentLab'
import { ShowLaboratoryContext } from '../ShowLaboratory'

const ShowLabPayments:React.FC = () => {
  const [showEditPLabModal, setShowEditPLabModal] = useState(false);
  const [showDeletePLabModal, setShowDeletePLabModal] = useState(false);
  const [selectedPaymentLab, setSelectedPaymentLab] = useState<PaymentLabType>(DefaultPaymentLabType);

  const { selectedDoctorLab } = useContext(ShowLaboratoryContext)

  return (
    <ShowLabPaymentsContext.Provider value={{
      showEditPLabModal, setShowEditPLabModal,
      showDeletePLabModal, setShowDeletePLabModal, 
      selectedPaymentLab, setSelectedPaymentLab
    }}>
    <div className='mt-2'>
      <h1 className="text-center text-3xl text-gray-700 mb-2 font-semibold">{selectedDoctorLab.username}</h1>
      <AddPaymentLab />
      <DataLabPayment />
      {showEditPLabModal && selectedPaymentLab && <EditPaymentLab PaymentData={selectedPaymentLab} modal={showEditPLabModal} toggle={() => setShowEditPLabModal(!showEditPLabModal)}  />}
      {showDeletePLabModal && selectedPaymentLab && <DeletePaymentLab PaymentData={selectedPaymentLab} modal={showDeletePLabModal} toggle={() => setShowDeletePLabModal(!showDeletePLabModal)}  />}
    </div>
    </ShowLabPaymentsContext.Provider>
  )
}

export default ShowLabPayments
