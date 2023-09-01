import React, { useContext, useEffect } from 'react'
import { ShowStatisticContext } from '../types'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { filterSpecificDate } from '../../../functions/functions'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { ShowPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls'
import { PurchaseOrderInterface } from '../../consumables/purchaseOrder/types'

const PurchaseOrderStats:React.FC = () => {
  const { selectedDate, day, month, showSwitchDate, startDate, endDate, sumPurchaseOrders, setSumPurchaseOrders } = useContext(ShowStatisticContext)
  const { purchaseOrders } = useSelector((state: State) => state.purchaseOrder)
  const { doctorId } = useParams()

  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      await dispatch(ShowPurchaseOrderApi(doctorId))
    }
    fetchPurchaseOrder()
  }, [dispatch, doctorId])

  useEffect(() => {
    setSumPurchaseOrders(
      filterSpecificDate(
        purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate
      )
      ?.filter((purchaseOrder: PurchaseOrderInterface) => purchaseOrder.doctor._id === doctorId)
      ?.reduce((acc, currVal: any) => acc + (currVal.total ?? 0), 0)
    )
  }, [sumPurchaseOrders, setSumPurchaseOrders, doctorId, purchaseOrders, day, month, showSwitchDate, startDate, endDate, selectedDate])

  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">Bon de commande</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
      {sumPurchaseOrders}
    </td>
  </tr>
  )
}

export default PurchaseOrderStats
