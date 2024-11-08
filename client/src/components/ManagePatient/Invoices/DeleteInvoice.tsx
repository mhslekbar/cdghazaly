import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { InvoicesInterface, ShowInvoicesContext } from './types';
import { DeleteInvoiceApi } from '../../../redux/invoices/invoiceApiCalls';
import { Timeout } from '../../../functions/functions';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import ShowErrorMsg from '../../../HtmlComponents/ShowErrorMsg';


interface DeleteInvoiceInterface {
  modal: boolean,
  toggle: () => void,
  InvoiceData: InvoicesInterface
}

const DeleteInvoice:React.FC<DeleteInvoiceInterface> = ({ modal, toggle, InvoiceData}) => {
  const dispatch: any = useDispatch()
  const { patientId } = useParams()
  const { setShowSuccessMsg } = useContext(ShowInvoicesContext)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  const HandleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await dispatch(DeleteInvoiceApi(patientId, InvoiceData._id))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      } else {
        setErrors(response)
      }
    } finally { 
      setLoading(false)
    } 
  }

  return (
    <div>
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
                    onSubmit={HandleSubmit}
                  >
                    <ShowErrorMsg errors={errors} setErrors={setErrors} />
                    <ButtonsForm loading={loading} toggle={toggle} typeBtn="Supprimer" />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteInvoice
