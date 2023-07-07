import React, { FormEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { useDispatch } from 'react-redux';
import { AddInvoiceAssuranceApi } from '../../../redux/assurances/invoiceAssApiCalls';
import { useParams } from 'react-router';
import { ShowAssurancesContext } from '../types';
import { Timeout } from '../../../functions/functions';


const AddInvoiceAssurance:React.FC = () => {
  
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const dispatch: any = useDispatch()
  const { AssId } = useParams()
  const {setShowSuccessMsg } = useContext(ShowAssurancesContext)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await dispatch(AddInvoiceAssuranceApi(AssId, {}))
      if(response === true) {
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  }

  return (
    <>
        <button className="p-2 rounded bg-main text-white" onClick={toggle}>
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
                    onSubmit={handleSubmit}
                  >
                    <ButtonsForm toggle={toggle} typeBtn='Ajouter'/>
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

export default AddInvoiceAssurance
