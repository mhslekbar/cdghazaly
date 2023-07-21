import React, { useContext } from 'react'
import { ShowStatisticContext } from '../types'

const PercentageDoctor:React.FC = () => {
  const { sumTotalAmount, sumConsoLab, userData} = useContext(ShowStatisticContext)
  const Remain = sumTotalAmount - sumConsoLab
  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">{userData.doctor?.percentage + "%"}</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">{(Remain * Number(userData.doctor?.percentage || 0) / 100)}</td>
  </tr>
  )
}

export default PercentageDoctor
