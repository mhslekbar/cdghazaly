import React, { useContext, useRef } from 'react'
import { TextAreaElement } from '../../../HtmlComponents/TextAreaElement'
import { useTranslation } from 'react-i18next'
import { DataPrescriptionContext } from '../types'
import HeaderInvoice from '../../ManagePatient/HeaderInvoice'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { DefaultPatientInterface, PatientInterface } from '../../patients/types'
import { useParams } from 'react-router'
import FooterInvoice from '../../ManagePatient/FooterInvoice'
import { useReactToPrint } from 'react-to-print'
import { FaPrint } from 'react-icons/fa'

const InputPrescription = () => {
  const { content, setContent } = useContext(DataPrescriptionContext)
  const { t } = useTranslation()
  
  const { patients } = useSelector((state: State) => state.patients)
  const { patientId } = useParams()
  const contentToPrint = useRef(null)

  const printDocument = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: t("Ordonnance"),
  })


  return (
    <div>
      <FaPrint className='text-blue text-2xl mb-2' onClick={printDocument}/>
      <section className="invoice flex flex-col" style={{ minHeight: '50vh' }} ref={contentToPrint}>
        <style>
          {` 
            @media print {
              .invoice {
                min-height: 100vh !important;
              }
            }
          `}
        </style>
        <HeaderInvoice PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface} type="Ordonnance" />
        <div style={{ flex: 1 }}>
          <TextAreaElement textAreaClass='h-44 print:hidden' name={t("Contenu")} placeholder={t("Donner une note si vous voulez")} value={content} setValue={setContent} />
          <p className='whitespace-pre-wrap hidden print:block'>{content}</p>
        </div>
        <FooterInvoice />
      </section>
    </div>
  )
}

export default InputPrescription