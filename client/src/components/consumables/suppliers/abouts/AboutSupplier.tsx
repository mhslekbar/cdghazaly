import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { ShowPurchaseOrderApi } from '../../../../redux/purchaseOrder/purchaseOrderApiCalls'
import { FaChevronCircleLeft, FaEye, FaEyeSlash } from 'react-icons/fa'
import PurchaseOrderSupplier from './PurchaseOrderSupplier'
import { AboutSupplierContext } from './types'
import HistoryPaymentSupplier from './HistoryPaymentSupplier'
import { DefaultPurchaseOrderInterface, PurchaseOrderInterface } from '../../purchaseOrder/types'
import { SupplierInterface, DefaultSupplierInterface} from '../types'

const AboutSupplier:React.FC = () => {
  const { suppliers } = useSelector((state: State) => state.suppliers)
  const { supplierId } = useParams()
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierInterface>(DefaultSupplierInterface)

  useEffect(() => {
    setSelectedSupplier(suppliers.find((supp: SupplierInterface) => supp._id === supplierId) ?? DefaultSupplierInterface)
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
      <p className='flex gap-2' onClick={() => setShowPurchaseOrders(!showPurchaseOrders)}>
        {showPurchaseOrders ?
          <FaEyeSlash className='text-blue' style={{ fontSize: "22px" }}/>
          :
          <FaEye className='text-blue' style={{ fontSize: "22px" }} /> 
        }
        {showPurchaseOrders ? "Cacher" : "Afficher" } les bons de commandes
      </p>
      <PurchaseOrderSupplier />
      <p className='flex gap-2 mt-3' onClick={() => setShowHistoryPayment(!showHistoryPayment)}>
        {showHistoryPayment ?
          <FaEyeSlash className='text-blue' style={{ fontSize: "22px" }}/>
          :
          <FaEye className='text-blue' style={{ fontSize: "22px" }} /> 
        }
          {showHistoryPayment ? "Cacher" : "Afficher" }  Historique de paiements
      </p>
      <HistoryPaymentSupplier />
    </div>
    </AboutSupplierContext.Provider>
  )
}

export default AboutSupplier
