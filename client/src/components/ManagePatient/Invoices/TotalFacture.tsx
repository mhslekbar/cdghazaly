import React, { useContext, useEffect, useState } from 'react'
import { InvoicesInterface, LineInvoiceInterface, ShowInvoicesContext } from './types';
import { PatientInterface } from '../../patients/types';

interface TotalFactureInterface {
  selectedInvoice: InvoicesInterface,
  typeInvoice: string,
  message: string,
  paymentType: string,  // assurance || patient || Total
  patientInfo: PatientInterface
}

const TotalFacture:React.FC<TotalFactureInterface> = ({ selectedInvoice, typeInvoice, message, paymentType, patientInfo }) => {
  const { totalAssurance, setTotalAssurance, totalPatient, setTotalPatient } = useContext(ShowInvoicesContext)
  const [totalAssuranceNoPercent, setTotalAssuranceNoPercent] = useState(0)
  
  useEffect(() => {
    setTotalAssuranceNoPercent(
      selectedInvoice?.LineInvoice
      ?.filter(
        (lnInvoice: LineInvoiceInterface) => {
          return lnInvoice.treatment.assurance;
        }
      )
      ?.reduce(
        (acc: any, currVal: LineInvoiceInterface) => {
          return currVal.price * currVal.teeth.nums.length + acc
        },0
      )
    )
    setTotalAssurance(
      selectedInvoice?.LineInvoice
      ?.filter(
        (lnInvoice: LineInvoiceInterface) => {
          return lnInvoice.treatment.assurance;
        }
      )
      ?.reduce(
        (acc: any, currVal: LineInvoiceInterface) => {
          return (currVal.price * currVal.teeth.nums.length * (Number(patientInfo.assurance?.percentCovered) / 100)) + acc
        },0
      )
    )
    setTotalPatient(
      selectedInvoice?.LineInvoice
      ?.filter(
        (lnInvoice: LineInvoiceInterface) => {
          return !lnInvoice.treatment.assurance;
        }
      )
      ?.reduce(
        (acc: any, currVal: LineInvoiceInterface) => {
          return currVal.price * currVal.teeth.nums.length + acc
        },0
      )
    )
    
  }, [paymentType, selectedInvoice, patientInfo, setTotalAssurance, setTotalPatient, typeInvoice])

  return (
    <tr className="text-center">
      <td colSpan={4}></td>
      <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">
        {message + ": "}
      </td>
      <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">
        {paymentType === "assurance" && totalAssurance}
        {paymentType === "patient" && Number(totalPatient) + Number(totalAssuranceNoPercent - totalAssurance)} {/*  + Number(totalAssuranceNoPercent - totalAssurance) */}
        {paymentType === "total" ?
          typeInvoice === "assuré" ?
            totalAssurance
          : 
            typeInvoice === "cabinet" ? 
              Number(totalPatient)  // + Number(totalAssuranceNoPercent - totalAssurance)
            : Number(totalAssurance) + Number(totalPatient) + Number(totalAssuranceNoPercent - totalAssurance)
          : ""
        }
      </td>
    </tr>
  )
}

export default TotalFacture



// {selectedInvoice?.LineInvoice
//   ?.filter(
//     (lnInvoice: LineInvoiceInterface) => {
//       if(paymentType === "total") {
//         if (typeInvoice === "assuré") {
//           return lnInvoice.treatment.assurance;
//         } else if (typeInvoice === "cabinet") {
//           return !lnInvoice.treatment.assurance;
//         }
//         return true;
//       } else if(paymentType === "assurance") {
//         return lnInvoice.treatment.assurance;
//       } else {
//         return !lnInvoice.treatment.assurance;
//       }
//     }
//   )
//   ?.reduce(
//     (acc: any, currVal: LineInvoiceInterface) => {
//       if(paymentType === "assurance") {
//         return (currVal.price * currVal.teeth.nums.length * (Number(patientInfo.assurance.percentCovered) / 100)) + acc
//       } 
//       return currVal.price * currVal.teeth.nums.length + acc
//     },0
//   )}



// else {
//   setSumFacture(selectedInvoice?.LineInvoice
//     ?.filter(
//       (lnInvoice: LineInvoiceInterface) => {
//         if(paymentType === "total") {
//           if (typeInvoice === "assuré") {
//             return lnInvoice.treatment.assurance;
//           } else if (typeInvoice === "cabinet") {
//             return !lnInvoice.treatment.assurance;
//           }
//           return true;
//         } else if(paymentType === "assurance") {
//           return lnInvoice.treatment.assurance;
//         } else {
//           return !lnInvoice.treatment.assurance;
//         }
//       }
//     )
//     ?.reduce(
//       (acc: any, currVal: LineInvoiceInterface) => {
//         if(paymentType === "assurance") {
//           return (currVal.price * currVal.teeth.nums.length * (Number(patientInfo.assurance.percentCovered) / 100)) + acc
//         } 
//         return currVal.price * currVal.teeth.nums.length + acc
//       },0
//     ))
// }