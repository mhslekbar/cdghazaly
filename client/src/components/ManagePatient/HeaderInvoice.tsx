import React from 'react'
import { PatientInterface } from '../patients/types'
import { RegNo } from '../../functions/functions'

interface HeaderInvoiceInterface {
  PatientInfo: PatientInterface,
  type: string
} 

const HeaderInvoice:React.FC<HeaderInvoiceInterface> = ({ PatientInfo, type }) => {
  return (
    <div className='py-4 bg-white hidden print:block'>
      <h1 className='text-2xl font-bold'>{type}</h1>
      <p>Doss.No: {RegNo(PatientInfo.RegNo)}</p>
      <p>Nom:  {PatientInfo.name}</p>
    </div>
  )
}

export default HeaderInvoice
