import React, { FormEvent, useContext, useState } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { PurchaseOrderInterface, ShowPurchaseOrderContext } from './types';
import { useDispatch } from 'react-redux';
import { DeletePurchaseOrderApi } from '../../../redux/purchaseOrder/purchaseOrderApiCalls';
import { useParams } from 'react-router';
import { Timeout } from '../../../functions/functions';
import ShowErrorMsg from '../../../HtmlComponents/ShowErrorMsg';

interface DeletePurchaseOrderInterface {
  modal: boolean,
  toggle: () => void,
  PurchaseOrderData: PurchaseOrderInterface,
}

const DeletePurchaseOrder:React.FC<DeletePurchaseOrderInterface> = ({ modal, toggle, PurchaseOrderData }) => { 
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const dispatch: any = useDispatch()
  const { doctorId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowPurchaseOrderContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Dies funktioniert nur, wenn keine Fehler vorliegen
      const response = await dispatch(DeletePurchaseOrderApi(doctorId, PurchaseOrderData._id))
        if(response === true) {
          toggle()
          setShowSuccessMsg(true)
          setTimeout(() => setShowSuccessMsg(false), Timeout)
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm loading={loading} typeBtn='Supprimer' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeletePurchaseOrder
