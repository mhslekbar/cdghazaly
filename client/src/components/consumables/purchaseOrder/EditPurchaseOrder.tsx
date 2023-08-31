import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface, PurchaseOrderInterface, ShowPurchaseOrderContext } from './types';
import InputsPurchaseOrder from './forms/InputsPurchaseOrder';
import { useDispatch } from 'react-redux';
import { EditPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import { useParams } from 'react-router';
import { Timeout, hideMsg } from '../../../functions/functions';
import { DefaultSupplierInterface, SupplierInterface } from '../suppliers/types';

interface EditPurchaseOrderInterface {
  modal: boolean,
  toggle: () => void,
  PurchaseOrderData: PurchaseOrderInterface,
}

const EditPurchaseOrder:React.FC<EditPurchaseOrderInterface> = ({ modal, toggle, PurchaseOrderData }) => { 
  const [ListPurchaseOrder, setListPurchaseOrder] = useState<LinePurchaseOrderInterface[]>(PurchaseOrderData.LinePurchaseOrder)
  const [errors, setErrors] = useState<string[]>([])
  const [supplier, setSupplier] = useState<SupplierInterface>(PurchaseOrderData.supplier ?? DefaultSupplierInterface)
  

  useEffect(() => {
    setListPurchaseOrder(
      PurchaseOrderData.LinePurchaseOrder.map((LinePurchaseOrder) => ({
        ...LinePurchaseOrder,
        consumable: {
          ...LinePurchaseOrder.consumable,
          value: LinePurchaseOrder.consumable._id,
          label: LinePurchaseOrder.consumable.name,
        },
      }))
    );
  }, [PurchaseOrderData])

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowPurchaseOrderContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      let findEmptyPurchase = ListPurchaseOrder.find((purchaseOrder: LinePurchaseOrderInterface) => purchaseOrder.consumable._id?.length === 0)
      let findEmptyQtyPurchase = ListPurchaseOrder.find((purchaseOrder: LinePurchaseOrderInterface) => purchaseOrder.qty === 0 && purchaseOrder.qty.toString().length === 0)
      
      const formErrors: string[] = []
      if(findEmptyPurchase) {
        formErrors.push("il y a une ligne vide dans votre bon de commande")
      }
      if(findEmptyQtyPurchase) {
        formErrors.push("il y a un element que vous n'avez pas donner sa quantite")
      }
      // Dies funktioniert nur, wenn keine Fehler vorliegen
      if(formErrors.length === 0) {
        const response = await dispatch(EditPurchaseOrderApi(doctorId, PurchaseOrderData._id, { supplier: supplier._id, LinePurchaseOrder: ListPurchaseOrder }))
        if(response === true) {
          toggle()
          setShowSuccessMsg(true)
          setTimeout(() => setShowSuccessMsg(false), Timeout)
          setListPurchaseOrder([DefaultLinePurchaseOrderInterface])
        } else {
          setErrors(response)
        }
      } else {
        setErrors(formErrors)
      }
    } catch {}
  }

  return (
    <DataPurchaseOrderContext.Provider value={{
      ListPurchaseOrder, setListPurchaseOrder,
      supplier, setSupplier
    }}>
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
                    onSubmit={handleSubmit}
                  >
                    {errors.length > 0 &&
                    errors.map((err, index) => (
                      <p
                        className="p-3 my-2 rounded bg-red text-white msg"
                        key={index}
                        onClick={(e) => hideMsg(e, errors, setErrors)}
                      >
                        {err}
                      </p>
                    ))}                    
                    <InputsPurchaseOrder />
                    <ButtonsForm typeBtn='Modifier' toggle={toggle} />
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

export default EditPurchaseOrder
