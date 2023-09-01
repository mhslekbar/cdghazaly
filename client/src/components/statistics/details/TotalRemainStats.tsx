import React, { useContext } from 'react'
import { ShowStatisticContext } from '../types'

const TotalRemainStats:React.FC = () => {
  const { percentCabinet, sumPurchaseOrders, sumConsumptions} = useContext(ShowStatisticContext)
  
  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">Total Restante</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
      {percentCabinet - (Number(sumPurchaseOrders) + Number(sumConsumptions))}
    </td>
  </tr>
  )
}

export default TotalRemainStats
