import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ShowListConsumableApi } from '../../../redux/listConsumable/listConsumableApiCalls'
import { DefaultListConsumableInterface, ListConsumableInterface, ShowConsumableListContext } from './types'
import AddListConsumable from './AddListConsumable'
import EditConsumableList from './EditConsumableList'
import DeleteConsumableList from './DeleteConsumableList'
import DataConsumableList from './DataConsumptions'


const ShowConsumableList:React.FC = () => {
  const [showEditListConsumable, setShowEditListConsumable] = useState(false)
  const [selectedListConsumable, setSelectedListConsumable] = useState<ListConsumableInterface>(DefaultListConsumableInterface)
  const [showDeleteListConsumable, setShowDeleteListConsumable] = useState(false)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchListConsumable = async () => {
      await dispatch(ShowListConsumableApi())
    }
    fetchListConsumable()
  }, [dispatch])

  return (
    <ShowConsumableListContext.Provider value={{
      showEditListConsumable, setShowEditListConsumable,
      selectedListConsumable, setSelectedListConsumable,
      showDeleteListConsumable, setShowDeleteListConsumable,
    }}>
      <AddListConsumable />
      <DataConsumableList />
      {showEditListConsumable && <EditConsumableList ConsumableListData={selectedListConsumable} modal={showEditListConsumable} toggle={() => setShowEditListConsumable(!showEditListConsumable)} />}
      {showDeleteListConsumable && <DeleteConsumableList ConsumableListData={selectedListConsumable} modal={showDeleteListConsumable} toggle={() => setShowDeleteListConsumable(!showDeleteListConsumable)} />}
    </ShowConsumableListContext.Provider>
  )
}

export default ShowConsumableList
