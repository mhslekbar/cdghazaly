import React, { useContext } from 'react'
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface } from '../types'
import { FaPlus } from 'react-icons/fa'
import RowPurchaseOrder from '../controls/RowPurchaseOrder'
import { SelectElement } from '../../../../HtmlComponents/SelectElement'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'

const InputsPurchaseOrder:React.FC = () => {
  const { ListPurchaseOrder, setListPurchaseOrder, supplier, setSupplier } = useContext(DataPurchaseOrderContext)

  const newRow = () => {
    setListPurchaseOrder([...ListPurchaseOrder, DefaultLinePurchaseOrderInterface])
  }

  const { suppliers } = useSelector((state: State) => state.suppliers)
  
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
      {/* defaultOption={<option>Choisir un fournisseur</option>}  */}
      <SelectElement name="Fournisseur" id="Fournisseur" value={supplier} setValue={setSupplier} options={suppliers} valueType={"object"} />
    </React.Fragment>
  )
}

export default InputsPurchaseOrder
