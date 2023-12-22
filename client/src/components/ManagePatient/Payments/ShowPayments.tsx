import React, { useEffect, useState } from 'react'
import DataPayments from './DataPayments'
import { useDispatch } from 'react-redux'
import { ShowPaymentsApi } from '../../../redux/payments/paymentApiCalls'
import { useLocation } from 'react-router'
import AddPayment from './controls/AddPayment'
import { DefaultPaymentInterface, EnumTypeModalPayment, PaymentInterface, ShowPaymentsContext } from './types'
import SuccessMsg from '../../../Messages/SuccessMsg'
import EditPayment from './controls/EditPayment'
import DeletePayment from './controls/DeletePayment'

const ShowPayments:React.FC = () => {
  const dispatch: any = useDispatch()
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [ModalType, setModalType] = useState(EnumTypeModalPayment.ADD_MODAL);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [showDeletePayment, setShowDeletePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentInterface>(DefaultPaymentInterface);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch(ShowPaymentsApi())
      // await dispatch(ShowPaymentsApi(`?patient=${patientId}`))
    }
    fetchPayments()
  }, [dispatch])

  const location = useLocation()

  return (
    <ShowPaymentsContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg,
      showEditPayment, setShowEditPayment,
      selectedPayment, setSelectedPayment,
      showDeletePayment, setShowDeletePayment,
      ModalType, setModalType,
      selectedPatient, setSelectedPatient
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
      <AddPayment />
      {location.pathname?.split("/")[5] === "payments" ? <DataPayments typeData="payment" /> : <DataPayments typeData="paymentAss" />} 
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

export default ShowPayments
