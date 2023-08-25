import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { DefaultSuppliersInterface, SuppliersInterface } from '../types'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { ShowPurchaseOrderApi } from '../../../../redux/purchaseOrder/purchaseOrderApiCalls'
import { FaChevronCircleLeft, FaEye } from 'react-icons/fa'
import PurchaseOrderSupplier from './PurchaseOrderSupplier'
import { AboutSupplierContext } from './types'
import { DefaultPurchaseOrderInterface, PurchaseOrderInterface } from '../../purhcaseOrder/types'
import HistoryPaymentSupplier from './HistoryPaymentSupplier'

const AboutSupplier:React.FC = () => {
  const { suppliers } = useSelector((state: State) => state.suppliers)
  const { supplierId } = useParams()
  const [selectedSupplier, setSelectedSupplier] = useState<SuppliersInterface>(DefaultSuppliersInterface)

  useEffect(() => {
    setSelectedSupplier(suppliers.find((supp: SuppliersInterface) => supp._id === supplierId) ?? DefaultSuppliersInterface)
  }, [suppliers, supplierId])

  const dispatch: any = useDispatch();
  const { doctorId } = useParams()

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      await dispatch(ShowPurchaseOrderApi(doctorId))
    }
    fetchPurchaseOrder()
  }, [dispatch, doctorId])

  const navigate = useNavigate()
  
  const [showPurchaseOrders, setShowPurchaseOrders] = useState<boolean>(true) // must set to true to show it by default
  const [showModalPurchaseOrder, setShowModalPurchaseOrder] = useState(false)
  const [selectedModalPurchaseOrder, setSelectedModalPurchaseOrder] = useState<PurchaseOrderInterface>(DefaultPurchaseOrderInterface)
  const [showHistoryPayment, setShowHistoryPayment] = useState<boolean>(true) // must set to true to show it by default

  return (
    <AboutSupplierContext.Provider value={{
      selectedSupplier, setSelectedSupplier,
      showPurchaseOrders, setShowPurchaseOrders,
      showModalPurchaseOrder, setShowModalPurchaseOrder,
      selectedModalPurchaseOrder, setSelectedModalPurchaseOrder,
      showHistoryPayment, setShowHistoryPayment
    }}>

    <div className='my-4'>
      <section className='grid grid-cols-2'>
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate(-1)}/>
        <h1 className='text-xl font-bold text-cente text-gray-700'>{selectedSupplier.name}</h1>
      </section>
      <p className='flex gap-2' onClick={() => setShowPurchaseOrders(!showPurchaseOrders)}><FaEye className='text-blue' style={{ fontSize: "22px" }} /> Afficher les bons de commandes</p>
      <PurchaseOrderSupplier />
      <p className='flex gap-2 mt-3' onClick={() => setShowHistoryPayment(!showHistoryPayment)}><FaEye className='text-blue' style={{ fontSize: "22px" }} /> Afficher Historique de paiements</p>
      <HistoryPaymentSupplier />
    </div>
    </AboutSupplierContext.Provider>
  )
}

export default AboutSupplier
