import React, { FormEvent, useContext } from 'react';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { InvoicesAssuranceInterface, ShowAssurancesContext } from '../types';
import { Timeout } from '../../../functions/functions';
import { useParams } from 'react-router';
import { PayInvoiceAssuranceApi } from '../../../redux/assurances/invoiceAssApiCalls';

interface PayInvoiceAssuranceInterface {
  modal: boolean,
  toggle: () => void,
  InvoiceData: InvoicesAssuranceInterface
}

const PayInvoiceAssurance:React.FC<PayInvoiceAssuranceInterface> = ({ modal, toggle, InvoiceData }) => {
  const dispatch: any = useDispatch()
  const { setShowSuccessMsg } = useContext(ShowAssurancesContext)

  const { AssId } = useParams()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(PayInvoiceAssuranceApi(AssId, InvoiceData._id))
      if(response === true) {
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
        toggle()
      }
    } catch {}
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
                    onSubmit={handleSubmit}
                  >
                    <ButtonsForm toggle={toggle} typeBtn="Payer" />
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

export default PayInvoiceAssurance
