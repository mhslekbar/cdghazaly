import React, { useContext } from 'react'
import { ShowStatisticContext } from '../types'

const RemainAmount:React.FC = () => {
  const { sumTotalAmount, sumConsoLab} = useContext(ShowStatisticContext)
  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">Reste</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">{sumTotalAmount - sumConsoLab}</td>
  </tr>
  )
}

export default RemainAmount
