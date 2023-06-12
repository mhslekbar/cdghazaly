import React, { FormEvent, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import InputInvoiceAssurance from './forms/InputInvoiceAssurance';
import { UserInterface } from '../../users/types';
import { DataInvoiceAssuranceContext } from './types';
import { useDispatch } from 'react-redux';
import { AddInvoiceAssuranceApi } from '../../../redux/assurances/invoiceAssApiCalls';
import { useParams } from 'react-router';
import { ShowAssurancesContext } from '../types';
import { Timeout } from '../../../functions/functions';


const AddInvoiceAssurance:React.FC = () => {
  const [inCommon, setInCommon] = useState(false)
  const [doctorInCommon, setDoctorInCommon] = useState<UserInterface[]>([])
  
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
      const response = await dispatch(AddInvoiceAssuranceApi(AssId, { doctor: doctorInCommon, inCommon }))
      if(response === true) {
        setDoctorInCommon([])
        setInCommon(false)
        toggle()
        setShowSuccessMsg(true)
        setTimeout(() => setShowSuccessMsg(false), Timeout)
      }
    } catch {}
  }

  return (
    <DataInvoiceAssuranceContext.Provider value={{
      inCommon, setInCommon,
      doctorInCommon, setDoctorInCommon
    }}>
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
                    {/* My Inputs */}
                    <InputInvoiceAssurance />
                    <ButtonsForm toggle={toggle} typeBtn='Ajouter'/>
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DataInvoiceAssuranceContext.Provider>
  );
}

export default AddInvoiceAssurance
