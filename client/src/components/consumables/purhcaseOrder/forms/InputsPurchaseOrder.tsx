import React, { useContext } from 'react'
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface } from '../types'
import { FaPlus } from 'react-icons/fa'
import RowPurchaseOrder from '../controls/RowPurchaseOrder'


const InputsPurchaseOrder:React.FC = () => {
  const { ListPurchaseOrder, setListPurchaseOrder } = useContext(DataPurchaseOrderContext)

  const newRow = () => {
    setListPurchaseOrder([...ListPurchaseOrder, DefaultLinePurchaseOrderInterface])
  }

  return (
    <React.Fragment>
      <div className='mt-2'>
        {ListPurchaseOrder
        .map((list: LinePurchaseOrderInterface, index) => (
          <React.Fragment key={index}>
          <RowPurchaseOrder 
            list={list}
            selectedIndex={index}
          />
        </React.Fragment>
        ))}
      </div>
      <div className='bg-blue p-2 rounded border w-fit' onClick={newRow}>
        <FaPlus />
      </div>
    </React.Fragment>
  )
}

export default InputsPurchaseOrder
