import React, { useEffect, useRef, useState } from 'react'
import DataInvoice from './DataInvoice'
import { FaPrint } from 'react-icons/fa'
import { MdRemoveCircle } from 'react-icons/md'
import SuccessMsg from '../../../Messages/SuccessMsg'
import { useLocation, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { ShowInvoicesApi } from '../../../redux/invoices/invoiceApiCalls'
import { DefaultInvoicesInterface, InvoicesInterface, ShowInvoicesContext } from './types'
import SelectInvoice from './SelectInvoice'
import CreateInvoice from './CreateInvoice'
import DeleteInvoice from './DeleteInvoice'
import { useReactToPrint } from 'react-to-print'

const ShowInvoices:React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoicesInterface>(DefaultInvoicesInterface)
  const [showEditInvoice, setShowEditInvoice] = useState(false)
  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [typeInvoice, setTypeInvoice] = useState<string>("global")
  const [totalAssurance, setTotalAssurance] = useState<number>(0)
  const [totalPatient, setTotalPatient] = useState<number>(0)
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [toggleInvoiceDetails, setToggleInvoiceDetails] = useState('hide');

  const handleShowDelete = () => {
    setShowDeleteInvoice(!showDeleteInvoice)
  }
  
  const { patientId } = useParams()
  const dispatch: any = useDispatch();
  
  const location = useLocation()
  
  useEffect(() => {
    location.pathname.split("/")[5] === "invoices"  && setSelectedPatient(patientId)
  }, [patientId, location])


  useEffect(() => {
    const fetchInvoice = async () => {
      await dispatch(ShowInvoicesApi());
    };
    fetchInvoice();
  }, [dispatch]);

  const invoiceRef = useRef(null)

  const printInvoice = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Facture",
  })

  return (
    <ShowInvoicesContext.Provider value={{
      selectedInvoice, setSelectedInvoice,
      showEditInvoice, setShowEditInvoice,
      showDeleteInvoice, setShowDeleteInvoice,
      showSuccessMsg, setShowSuccessMsg,
      typeInvoice, setTypeInvoice,
      totalAssurance, setTotalAssurance,
      totalPatient, setTotalPatient,
      selectedPatient, setSelectedPatient,
      invoiceRef,
      toggleInvoiceDetails, setToggleInvoiceDetails
    }}>
    {showSuccessMsg && <SuccessMsg modal={showSuccessMsg} toggle={() => setShowSuccessMsg(!showSuccessMsg)} />}
    <div className='grid grid-cols-6 mt-4'>
      <div className='flex justify-between'>
        <CreateInvoice />
        <SelectInvoice />
      </div>
      <DataInvoice />
      {selectedInvoice && 
        <div className='ml-4'>
          <FaPrint className='text-main' style={{
            fontSize: "28px"
          }} 
          onClick={printInvoice}
          />
          <MdRemoveCircle 
            className='text-red'
            style={{
              fontSize: "28px"
            }}
            onClick={() => handleShowDelete()}
          />
        </div>
      }
      {showDeleteInvoice && 
        <DeleteInvoice InvoiceData={selectedInvoice} modal={showDeleteInvoice} toggle={() => setShowDeleteInvoice(!showDeleteInvoice)}/>
      }
    </div>
    </ShowInvoicesContext.Provider>
  )
}

export default ShowInvoices
