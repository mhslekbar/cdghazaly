import React, { useState } from "react";
import Select from 'react-select'
import { InputElement } from "../../../../HtmlComponents/InputElement";
import { LinePurchaseOrderInterface } from "../types";
import { ListConsumableInterface } from "../../consumableList/types";

interface RowPurchaseOrderInterface {
  listAllConsumable: any[],
  consumable: ListConsumableInterface,
  setConsumable: (consumable: ListConsumableInterface) => void,
  qty: number,
  setQty: (qty: number) => void,
  list?: LinePurchaseOrderInterface
}

const RowPurchaseOrder:React.FC<RowPurchaseOrderInterface> = ({ listAllConsumable, consumable, setConsumable, qty, setQty, list }) => {  
  const [amount, setAmount] = useState(0) 

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
    <section className="grid grid-cols-3 gap-1">
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
      <InputElement type="number" name="Montant" id="amount" value={amount} setValue={setAmount} />
    </section>
  );
};

export default RowPurchaseOrder;



  // useEffect(() => {
  //   setQty(list.qty)
  // }, [list, setQty])

  // useEffect(() => {
  //   setConsumable(list.consumable)
  // }, [list, setConsumable])
