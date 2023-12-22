import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { InvoicesInterface, ShowInvoicesContext } from './types';

const SelectInvoice:React.FC = () => {
  const { invoices } = useSelector((state: State) => state.invoices);
  const { selectedInvoice, setSelectedInvoice, selectedPatient } = useContext(ShowInvoicesContext)
  
  return (
    <div className='flex' style={{
      flexDirection: "column"
    }}>
      {
      invoices
      .filter((inv: InvoicesInterface) => inv.patient?._id === selectedPatient)
      .map((invoice: InvoicesInterface) => {
        return (<span 
          key={invoice._id}
          className={`${selectedInvoice?._id === invoice._id ? "border-r-2 border-main bg-white" : ""} text-main px-2 rounded mr-2 cursor-pointer`}
          onClick={() => setSelectedInvoice(invoice)}
        >
          N-{invoice.numInvoice}
        </span>)
      })}
    </div>
  )
}

export default SelectInvoice
