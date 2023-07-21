import React, { useEffect, useState } from 'react'
import { ShowConsumptionsApi } from '../../../redux/consumptions/consumptionApiCalls'
import { useDispatch } from 'react-redux'
import DataConsumptions from './DataConsumptions'
import AddConsumption from './AddConsumption'
import { DefaultMyConsumptionsInterface, MyConsumptionsInterface, ShowMyConsumptionContext } from './types'
import EditConsumption from './EditConsumption'
import DeleteConsumption from './DeleteConsumption'
import FilterConsumable from '../FilterConsumable'

const ShowMyConsumptions:React.FC = () => {
  const [showEditConsumption, setShowEditConsumption] = useState(false)
  const [selectedConsumption, setSelectedConsumption] = useState<MyConsumptionsInterface>(DefaultMyConsumptionsInterface)
  const [showDeleteConsumption, setShowDeleteConsumption] = useState(false)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchConsumption = async () => {
      await dispatch(ShowConsumptionsApi())
    }
    fetchConsumption()
  }, [dispatch])

  return (
    <ShowMyConsumptionContext.Provider value={{
      showEditConsumption, setShowEditConsumption,
      selectedConsumption, setSelectedConsumption,
      showDeleteConsumption, setShowDeleteConsumption
    }}>
      <AddConsumption />
      <FilterConsumable />
      <DataConsumptions />
      {showEditConsumption && selectedConsumption && <EditConsumption ConsumptionData={selectedConsumption} modal={showEditConsumption} toggle={() => setShowEditConsumption(!showEditConsumption)} />}
      {showDeleteConsumption && selectedConsumption && <DeleteConsumption ConsumptionData={selectedConsumption} modal={showDeleteConsumption} toggle={() => setShowDeleteConsumption(!showDeleteConsumption)} />}
    </ShowMyConsumptionContext.Provider>
  )
}

export default ShowMyConsumptions
