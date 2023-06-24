import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowPaymentsApi } from '../../../redux/payments/paymentApiCalls'
import { useParams } from 'react-router'
import AddPayment from './controls/AddPayment'
import { DefaultPaymentInterface, EnumTypeModalPayment, PaymentInterface, ShowPaymentsContext } from './types'
import SuccessMsg from '../../../Messages/SuccessMsg'
import EditPayment from './controls/EditPayment'
import DeletePayment from './controls/DeletePayment'
import Consultations from './Consultations'


const ShowConsultations:React.FC = () => {
  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [ModalType, setModalType] = useState(EnumTypeModalPayment.ADD_MODAL);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [showDeletePayment, setShowDeletePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentInterface>(DefaultPaymentInterface);

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch(ShowPaymentsApi(`?patient=${patientId}`))
    }
    fetchPayments()
  }, [dispatch, patientId])

  return (
    <ShowPaymentsContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg,
      showEditPayment, setShowEditPayment,
      selectedPayment, setSelectedPayment,
      showDeletePayment, setShowDeletePayment,
      ModalType, setModalType,
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
      <AddPayment />
      <Consultations />
      { 
        showEditPayment && 
        selectedPayment && 
        <EditPayment paymentData={selectedPayment} modal={showEditPayment} toggle={() => setShowEditPayment(!showEditPayment)} />
      }
      { 
        showDeletePayment && 
        selectedPayment && 
        <DeletePayment paymentData={selectedPayment} modal={showDeletePayment} toggle={() => setShowDeletePayment(!showDeletePayment)} />
      }
    </ShowPaymentsContext.Provider>
  )
}

export default ShowConsultations
