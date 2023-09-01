import React, { useContext, useEffect } from 'react'
import { ShowStatisticContext } from '../types'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { filterSpecificDate } from '../../../functions/functions'
import { useParams } from 'react-router'
import { MyConsumptionsInterface } from '../../consumables/consumptions/types'
import { useDispatch } from 'react-redux'
import { ShowConsumptionsApi } from '../../../redux/consumptions/consumptionApiCalls'

const ConsumptionStats:React.FC = () => {
  const { selectedDate, day, month, showSwitchDate, startDate, endDate, sumConsumptions, setSumConsumptions } = useContext(ShowStatisticContext)
  const { consumptions } = useSelector((state: State) => state.consumptions)
  const { doctorId } = useParams()

  const dispatch: any = useDispatch()
  
  useEffect(() => {
    const fetchConsumption = async () => {
      await dispatch(ShowConsumptionsApi())
    }
    fetchConsumption()
  }, [dispatch])


  useEffect(() => {
    setSumConsumptions(filterSpecificDate(
      consumptions, day, month, showSwitchDate, startDate, endDate, selectedDate
    )
    ?.filter((consumption: MyConsumptionsInterface) => consumption.doctor._id === doctorId)
    ?.reduce((acc, currVal: any) => acc + currVal.amount, 0))
  }, [sumConsumptions, setSumConsumptions, doctorId, consumptions, day, month, showSwitchDate, startDate, endDate, selectedDate])



  return (
  <tr className=''>
    <td colSpan={2}></td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">Consommations</td>
    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
      {sumConsumptions}
    </td>
  </tr>
  )
}

export default ConsumptionStats
