import React, { useContext } from 'react'
import { ShowStatisticContext } from '../types'

const PercentageCabinet:React.FC = () => {
  const { sumTotalAmount, sumConsoLab, userData } = useContext(ShowStatisticContext)
  const Remain = sumTotalAmount - sumConsoLab
  
  return (
  <tr className='border-b'>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">{(100 - Number(userData.doctor?.percentage)) + "%"}</td>
    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">{(Remain * (100 - Number(userData.doctor?.percentage || 0)) / 100)}</td>
  </tr>
  )
}

export default PercentageCabinet
