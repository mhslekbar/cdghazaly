import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FaChevronCircleLeft, FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { DataPurchaseOrderContext, DefaultLinePurchaseOrderInterface, LinePurchaseOrderInterface, ShowPurchaseOrderContext } from './types';
import InputsPurchaseOrder from './forms/InputsPurchaseOrder';
import { useDispatch } from 'react-redux';
import { AddPurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import { useNavigate, useParams } from 'react-router';
import { Timeout, hideMsg } from '../../../functions/functions';
import { DefaultSupplierInterface, SupplierInterface } from '../suppliers/types';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';

const AddPurchaseOrder:React.FC = () => { 
  const [ListPurchaseOrder, setListPurchaseOrder] = useState<LinePurchaseOrderInterface[]>([DefaultLinePurchaseOrderInterface])
  const [supplier, setSupplier] = useState<SupplierInterface>(DefaultSupplierInterface)
  const [errors, setErrors] = useState<string[]>([])
  
  const { suppliers } = useSelector((state: State) => state.suppliers)

  useEffect(() => {
    setSupplier(suppliers[0] ?? DefaultSupplierInterface)
  }, [suppliers])

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
      let findEmptyPurchase = ListPurchaseOrder.find((purchaseOrder: LinePurchaseOrderInterface) => purchaseOrder.consumable._id?.length === 0)
      let findEmptyQtyPurchase = ListPurchaseOrder.find((purchaseOrder: LinePurchaseOrderInterface) => purchaseOrder.qty === 0 && purchaseOrder.qty.toString().length === 0)
      
      const formErrors: string[] = []
      if(findEmptyPurchase) {
        formErrors.push("il y a une ligne vide dans votre bon de commande")
      }
      if(findEmptyQtyPurchase) {
        formErrors.push("il y a un element que vous n'avez pas donner sa quantite")
      }
      
      if(formErrors.length === 0) {
        const response = await dispatch(AddPurchaseOrderApi(doctorId, { supplier: supplier._id, LinePurchaseOrder: ListPurchaseOrder }))
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

  const navigate = useNavigate()

  return (
    <DataPurchaseOrderContext.Provider value={{
      ListPurchaseOrder, setListPurchaseOrder,
      supplier, setSupplier
    }}>
      <div className="flex justify-start gap-2 mt-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
        <button className="p-2 rounded btn-main" onClick={toggle}>
          <FaPlus />
        </button>
      </div>
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
