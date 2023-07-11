import React, { FormEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { DefaultListConsumableInterface, ListConsumableInterface } from '../consumableList/types';
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface, ShowPurchaseOrderContext } from './types';
import InputsPurchaseOrder from './forms/InputsPurchaseOrder';
import { useDispatch } from 'react-redux';
import { AddPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import { useParams } from 'react-router';
import { Timeout } from '../../../functions/functions';

const AddPurchaseOrder:React.FC = () => { 
  const [ListPurchaseOrder, setListPurchaseOrder] = useState<LinePurchaseOrderInterface[]>([DefaultLinePurchaseOrderInterface])
  const [consumable, setConsumable] = useState<ListConsumableInterface>(DefaultListConsumableInterface)
  const [qty, setQty] = useState<number>(0)

  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowPurchaseOrderContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(AddPurchaseOrderApi(doctorId, { LinePurchaseOrder: {} }))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  }

  return (
    <DataPurchaseOrderContext.Provider value={{
      consumable, setConsumable,
      qty, setQty,
      ListPurchaseOrder, setListPurchaseOrder,
    }}>
        <button className="p-2 rounded bg-main text-white mt-3" onClick={toggle}>
          <FaPlus />
        </button>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onClick={() => handleSubmit}
                  >
                    <InputsPurchaseOrder />
                    <ButtonsForm typeBtn='Ajouter' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataPurchaseOrderContext.Provider>
  );
}

export default AddPurchaseOrder
