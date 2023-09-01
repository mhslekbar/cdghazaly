import React, { useContext, useEffect, useState } from 'react'
import { ShowStatisticContext } from '../types'

const PercentageCabinet:React.FC = () => {
  const { sumTotalAmount, sumConsoLab, userData, setPercentCabinet } = useContext(ShowStatisticContext)
  const [Remain, setRemain] = useState<number>(0)
  
  useEffect(() => {
    setRemain(sumTotalAmount - sumConsoLab)
  }, [sumTotalAmount, sumConsoLab])

  useEffect(() => {
    setPercentCabinet(Remain * (100 - Number(userData.doctor?.percentage || 0)) / 100)
  }, [userData, setPercentCabinet, Remain])

  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">{100 - Number(userData.doctor?.percentage) + "%"}</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">{(Remain * (100 - Number(userData.doctor?.percentage || 0)) / 100)}</td>
  </tr>
  )
}

export default PercentageCabinet
