import React, { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import { DataPurchaseOrderContext, LinePurchaseOrderInterface } from "../types";
import { useSelector } from "react-redux";
import { State } from "../../../../redux/store";
import { ListConsumableInterface } from "../../consumableList/types";
import { MdRemoveCircle } from "react-icons/md";

interface RowPurchaseOrderInterface {
  list?: LinePurchaseOrderInterface,
  selectedIndex: number
}

const RowPurchaseOrder:React.FC<RowPurchaseOrderInterface> = ({ list, selectedIndex }) => {  
  const [qty, setQty] = useState(list?.qty) 
  const [consumable, setConsumable] = useState(list?.consumable) 
  
  useEffect(() => {
    setConsumable(list?.consumable)
  }, [list?.consumable])

  useEffect(() => {
    setQty(list?.qty)
  }, [list?.qty])


  const { ListConsumable } = useSelector((state: State) => state.ListConsumable)

  const [listAllConsumable, setListAllConsumable] = useState<any[]>(ListConsumable)
  const { ListPurchaseOrder, setListPurchaseOrder } = useContext(DataPurchaseOrderContext)

  useEffect(() => {
    setListAllConsumable(ListConsumable.map((data: ListConsumableInterface) => ({ _id: data._id, value: data._id, label: data.name })))
  }, [ListConsumable])

  const [isRendered, setIsRendered] = useState(false) // for first render
  useEffect(() => {
    !isRendered && setListPurchaseOrder(ListPurchaseOrder.map((purchaseOrder: LinePurchaseOrderInterface) => ({
      consumable: purchaseOrder.consumable, 
      qty: purchaseOrder.qty, 
      createdAt: purchaseOrder.createdAt, 
    }) ))
    setIsRendered(true)
    // eslint-disable-next-line
  }, [ListPurchaseOrder, qty, consumable, setListPurchaseOrder])

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

  const removeRow = () => {
    setListPurchaseOrder(ListPurchaseOrder
      .filter((purchaseOrder: LinePurchaseOrderInterface, indx) => indx !== selectedIndex)
    )
  }

  return (
    <section className="grid grid-cols-3 gap-1">
      <div className="mb-2 col-span-2">
        <label htmlFor="consumable" className="block text-gray-700 font-bold">
          Consommable
        </label>
        <Select
          id="consumable"
          styles={customStyles}
          value={consumable}
          onChange={(e: any) => {
            ListPurchaseOrder[selectedIndex].consumable = e
            setConsumable(e)
          }}
          options={listAllConsumable}
        />
      </div>

      <div className="relative">

      <div className={`mb-2 `}>
        <label htmlFor="Quantite" className={`block text-gray-700 font-bold w-fit`}>
        Quantite
        </label>      
        <input
          type="number"
          id="Quantite"
          className="uppercase w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder="Quantite"
          value={qty}
          autoComplete="off"
          onChange={(e: any) => {
            ListPurchaseOrder[selectedIndex].qty = e.target.value
            setQty(e.target.value)
          }}
        />
      </div>
        {selectedIndex > 0 &&
          <MdRemoveCircle className="text-red absolute top-8 right-0" style={{ fontSize: "22px" }} onClick={removeRow} />
        }
      </div>
    </section>
  );
};

export default RowPurchaseOrder;
