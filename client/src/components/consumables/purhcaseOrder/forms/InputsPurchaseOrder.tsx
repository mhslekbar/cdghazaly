import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../../../redux/store'
import { ListConsumableInterface } from '../../consumableList/types'
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface } from '../types'
import { FaPlus } from 'react-icons/fa'
import Select from 'react-select'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import RowPurchaseOrder from '../controls/RowPurchaseOrder'


const InputsPurchaseOrder:React.FC = () => {
  const { ListConsumable } = useSelector((state: State) => state.ListConsumable)
  const [listAllConsumable, setListAllConsumable] = useState<any[]>(ListConsumable)
  
  const { consumable, setConsumable, qty, setQty, ListPurchaseOrder, setListPurchaseOrder } = useContext(DataPurchaseOrderContext)

  useEffect(() => {
    setListAllConsumable(ListConsumable.map((data: ListConsumableInterface) => ({value: data._id, label: data.name})))
  }, [ListConsumable])

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? '#00b894' : "#FFF",
      borderBottom: "2px solid #DEE",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused && "none",
      outline: state.isFocused && "none",
    }),
  };

  return (
    <div>
      <FaPlus className="text-blue" onClick={() => setListPurchaseOrder([...ListPurchaseOrder, DefaultLinePurchaseOrderInterface])} />
      {/* {ListPurchaseOrder.map((list: LinePurchaseOrderInterface, index) => (
        <section className="grid grid-cols-3 gap-1" key={index}>
        <div className="mb-2 col-span-2">
          <label htmlFor="consumable" className="block text-gray-700 font-bold">
            Consommable
          </label>
          <Select
            id="consumable"
            styles={customStyles}
            value={consumable}
            onChange={(e: any) => setConsumable(e)}
            options={listAllConsumable}
          />
        </div>
        <InputElement type="number" name="Quantite" id="qty" value={qty} setValue={setQty} />
      </section>
      ))} */}
      
      <RowPurchaseOrder 
        listAllConsumable={listAllConsumable}
        consumable={consumable}
        setConsumable={setConsumable}
        qty={qty}
        setQty={setQty}
      />

      <RowPurchaseOrder 
        listAllConsumable={listAllConsumable}
        consumable={consumable}
        setConsumable={setConsumable}
        qty={qty}
        setQty={setQty}
      />

      <RowPurchaseOrder 
        listAllConsumable={listAllConsumable}
        consumable={consumable}
        setConsumable={setConsumable}
        qty={qty}
        setQty={setQty}
      />

    </div>
  )
}

export default InputsPurchaseOrder
