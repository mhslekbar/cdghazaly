import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import DataPurchaseOrder from './DataPurchaseOrder';
import { useParams } from 'react-router';
import AddPurchaseOrder from './AddPurchaseOrder';
import { DefaultPurchaseOrderInterface, PurchaseOrderInterface, ShowPurchaseOrderContext } from './types';
import EditPurchaseOrder from './EditPurchaseOrder';
import DeletePurchaseOrder from './DeletePurchaseOrder';
import SuccessMsg from '../../../Messages/SuccessMsg';
import FilterConsumable from '../FilterConsumable';
import { ShowListConsumableApi } from '../../../redux/listConsumable/listConsumableApiCalls';
import { ShowSuppliersApi } from '../../../redux/suppliers/supplierApiCalls';
import HistoryPaymentPurchaseOrder from './controls/payments/HistoryPaymentPurchaseOrder';
import ShowListBC from './controls/ShowListBC';

const ShowPurchaseOrder:React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const [showEditPurchaseOrder, setShowEditPurchaseOrder] = useState(false)
  const [showDeletePurchaseOrder, setShowDeletePurchaseOrder] = useState(false)
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrderInterface>(DefaultPurchaseOrderInterface)
  const [showPaymentPurchaseOrder, setShowPaymentPurchaseOrder] = useState(false)
  const [showPurchaseOrderLine, setShowPurchaseOrderLine] = useState(false)

  const dispatch: any = useDispatch();
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      await dispatch(ShowPurchaseOrderApi(doctorId))
    }
    fetchPurchaseOrder()
  }, [dispatch, doctorId])

  useEffect(() => {
    const fetchSuppliers = async () => {
      await dispatch(ShowSuppliersApi())
    }
    fetchSuppliers()
  }, [dispatch, doctorId])

  useEffect(() => {
    const fetchListConsumable = async () => {
      await dispatch(ShowListConsumableApi())
    }
    fetchListConsumable()
  }, [dispatch])


  return (
    <ShowPurchaseOrderContext.Provider value={{
      showSuccessMsg, setShowSuccessMsg,
      selectedPurchaseOrder, setSelectedPurchaseOrder,
      showEditPurchaseOrder, setShowEditPurchaseOrder,
      showDeletePurchaseOrder, setShowDeletePurchaseOrder,
      showPaymentPurchaseOrder, setShowPaymentPurchaseOrder,
      showPurchaseOrderLine, setShowPurchaseOrderLine
    }}>
      {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
      <AddPurchaseOrder />
      <FilterConsumable />
      <DataPurchaseOrder />
      {selectedPurchaseOrder && showPurchaseOrderLine &&
        <ShowListBC ActiveShowListBC={selectedPurchaseOrder} modal={showPurchaseOrderLine} toggle={() => setShowPurchaseOrderLine(!showPurchaseOrderLine)}  />
      }
      {selectedPurchaseOrder && showEditPurchaseOrder &&
        <EditPurchaseOrder PurchaseOrderData={selectedPurchaseOrder} modal={showEditPurchaseOrder} toggle={() => setShowEditPurchaseOrder(!showEditPurchaseOrder)}  />
      }
      {selectedPurchaseOrder && showPaymentPurchaseOrder &&
        <HistoryPaymentPurchaseOrder PurchaseOrderData={selectedPurchaseOrder} modal={showPaymentPurchaseOrder} toggle={() => setShowPaymentPurchaseOrder(!showPaymentPurchaseOrder)}  />
      }
      {selectedPurchaseOrder && showDeletePurchaseOrder &&
        <DeletePurchaseOrder PurchaseOrderData={selectedPurchaseOrder} modal={showDeletePurchaseOrder} toggle={() => setShowDeletePurchaseOrder(!showDeletePurchaseOrder)}  />
      }
    </ShowPurchaseOrderContext.Provider>
  )
}

export default ShowPurchaseOrder
