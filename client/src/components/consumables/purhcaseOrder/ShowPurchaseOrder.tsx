import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import DataPurchaseOrder from './DataPurchaseOrder';
import { useParams } from 'react-router';
import AddPurchaseOrder from './AddPurchaseOrder';
import { ShowPurchaseOrderContext } from './types';

const ShowPurchaseOrder:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)

  const dispatch: any = useDispatch();
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      await dispatch(ShowPurchaseOrderApi(doctorId))
    }
    fetchPurchaseOrder()
  }, [dispatch, doctorId])

  return (
    <ShowPurchaseOrderContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg
    }}>
      <AddPurchaseOrder />
      <DataPurchaseOrder />
    </ShowPurchaseOrderContext.Provider>
  )
}

export default ShowPurchaseOrder
