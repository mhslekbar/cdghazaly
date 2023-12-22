import React, { useContext, useEffect, useRef, useState } from 'react'
import { DefaultInvoicesInterface, InvoicesInterface, ShowInvoicesContext } from '../../ManagePatient/Invoices/types';
import DataInvoice from '../../ManagePatient/Invoices/DataInvoice';
import { FaPrint } from 'react-icons/fa';
import SelectInvoice from '../../ManagePatient/Invoices/SelectInvoice';
import { ShowPatientsAssuranceContext } from './types';
import { useDispatch } from 'react-redux';
import { ShowInvoicesApi } from '../../../redux/invoices/invoiceApiCalls';
import FilterTypeInvoice from '../../ManagePatient/Invoices/FilterTypeInvoice';
import { DefaultPaymentInterface, EnumTypeModalPayment, PaymentInterface, ShowPaymentsContext } from '../../ManagePatient/Payments/types';
import Consultations from '../../ManagePatient/Payments/Consultations';
import { ShowPaymentsApi } from '../../../redux/payments/paymentApiCalls';

interface props {
  modal: boolean,
  toggle: any,
}

const PrintModal: React.FC<props> = ({ modal, toggle }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoicesInterface>(DefaultInvoicesInterface)
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [typeInvoice, setTypeInvoice] = useState<string>("global")
  const [totalAssurance, setTotalAssurance] = useState<number>(0)
  const [totalPatient, setTotalPatient] = useState<number>(0)
  const { selectedPatient: selectedPatientAssurance, invoiceType } = useContext(ShowPatientsAssuranceContext)

  const dispatch: any = useDispatch();

  const [ModalType, setModalType] = useState(EnumTypeModalPayment.ADD_MODAL);
  const [showEditPayment, setShowEditPayment] = useState(false);
  const [showDeletePayment, setShowDeletePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentInterface>(DefaultPaymentInterface);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    setSelectedPatient(selectedPatientAssurance)
  }, [selectedPatientAssurance])

  useEffect(() => {
    const fetchInvoice = async () => {
      await dispatch(ShowInvoicesApi())
      await dispatch(ShowPaymentsApi())
    };
    fetchInvoice();
  }, [dispatch]);

  const invoiceRef = useRef(null)

  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-start min-h-screen px-4 py-8">
              <div className="relative w-full p-4 mx-auto bg-white rounded-md shadow-lg" style={{ width: "1000px" }}>
                <div className="mt-3">
                  {/* STart Invoice */}
                  {invoiceType === "invoice" ?
                    <ShowInvoicesContext.Provider value={{
                      selectedInvoice, setSelectedInvoice,
                      showEditInvoice, setShowEditInvoice,
                      showDeleteInvoice, setShowDeleteInvoice,
                      showSuccessMsg, setShowSuccessMsg,
                      typeInvoice, setTypeInvoice,
                      totalAssurance, setTotalAssurance,
                      totalPatient, setTotalPatient,
                      selectedPatient, setSelectedPatient,
                      invoiceRef
                    }}>
                      <div className='grid grid-cols-6 mt-4'>    
                        <div className='flex justify-between'>
                          <SelectInvoice />
                        </div>
                        {selectedPatient?.assurance?.society && <FilterTypeInvoice />}
                        <DataInvoice />
                        {selectedInvoice && 
                          <div className='ml-4'>
                            <FaPrint className='text-main' style={{
                              fontSize: "28px"
                            }} 
                            onClick={() => window.print()}
                            />
                          </div>
                        }
                      </div>

                    </ShowInvoicesContext.Provider>
                  // End invoice 
                  :
                  // typeInvoice === "cons" &&
                    <ShowPaymentsContext.Provider value={{
                      showSuccessMsg, setShowSuccessMsg,
                      showEditPayment, setShowEditPayment,
                      selectedPayment, setSelectedPayment,
                      showDeletePayment, setShowDeletePayment,
                      ModalType, setModalType,
                      selectedPatient, setSelectedPatient
                    }}>
                      <Consultations />
                    </ShowPaymentsContext.Provider>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PrintModal