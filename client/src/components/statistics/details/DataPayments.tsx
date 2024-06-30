import React, { useContext } from 'react'
import { EnumTypePayment, PaymentInterface } from '../../ManagePatient/Payments/types'
import { useLocation, useNavigate, useParams } from 'react-router'
import { RegNo, filterSpecificDate, formatDate, formatHourAndMinute } from '../../../functions/functions'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { ShowStatisticContext } from '../types'
import PaymentLab from './PaymentLab'
import TotalAmount from './TotalAmount'
import RemainAmount from './RemainAmount'
import PercentageDoctor from './PercentageDoctor'
import PercentageCabinet from './PercentageCabinet'
import PurchaseOrderStats from './PurchaseOrderStats'
import ConsumptionStats from './ConsumptionsStats'
import TotalRemainStats from './TotalRemainStats'
import { useTranslation } from 'react-i18next'

interface props {
  paymentFilter: string
}

const DataPayments:React.FC<props> = ({ paymentFilter }) => {
  const { payments } = useSelector((state: State) => state.payments);
  const { doctorId } = useParams()
  let sumCons = 0
  let sumPayment = 0
  const { selectedDate, day, month, showSwitchDate, startDate, endDate } = useContext(ShowStatisticContext)
  const location = useLocation()

  const filteredPayment = paymentFilter === "payment" ? EnumTypePayment.PAYMENT : EnumTypePayment.SOINS
  const { t } = useTranslation();

  const TrBgColor = (payment: any) => {
    return paymentFilter === "payment" && !payment.approved ? "bg-payment-not-approved" : ""
  }

  const navigate = useNavigate()

  return (
    <div className="flex flex-col border">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
        <div className="overflow-hidden">
          <table className="min-w-full text-sm font-light text-center">
            <thead className="border border-gray-950 font-medium bg-main text-white">
              <tr>
                <th className="px-6 py-4 border-r border-gray-950">{t("DOSS.No")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Nom")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Consultation")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{paymentFilter === "payment" ? t("Versement") : paymentFilter === "soins" ?  t("soins") : ""}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Mode de paiement")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Ajouter par")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Date")}</th>
                <th className="px-6 py-4 border-r border-gray-950">{t("Date D'ajout")}</th>
              </tr>
            </thead>
            <tbody className='border border-gray-950'>
              {
                filterSpecificDate(
                  payments, day, month, showSwitchDate, startDate, endDate, selectedDate
                )
                ?.filter(
                  (payment: PaymentInterface) => 
                  payment.doctor._id === doctorId 
                  && (payment.type === paymentFilter || payment.type === "consultations")
                  && (payment.invoiceAssur ? payment.invoiceAssur?.payed : payment)
                )
                // ?.filter((payment: PaymentInterface) => setHourTimeOfDay(payment.createdAt, startDate, endDate, partOfDay))
                ?.sort((a: PaymentInterface, b: PaymentInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                ?.map((payment: PaymentInterface, index) => {
                  sumCons += payment.type === EnumTypePayment.CONSULTATION ? payment.amount : 0
                  sumPayment += payment.type === filteredPayment ? payment.amount : 0
                  if(payment.amount === 0) {
                    return "";
                  }

                  return (
                    <tr className={`border-b border-gray-950 `} key={index}>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {payment.patient?.RegNo
                          ? RegNo(payment.patient?.RegNo)
                          : "0000"}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}
                        onClick={() => {
                          localStorage.setItem("patientMgtPrevLink", location.pathname)
                          navigate(`/patient/${doctorId}/${payment.patient._id}/Manage/devis`)
                        }}
                      >
                        {payment.patient?.name}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {payment.type === EnumTypePayment.CONSULTATION && payment.amount}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {payment.type === filteredPayment && payment.amount}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {payment.invoiceAssur?._id ? "Assurance" : payment.method?.name || "cash"}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {payment.user?.username}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {formatDate(payment.paymentDate) + " " + formatHourAndMinute(payment.paymentDate)}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium ${TrBgColor(payment)}`}>
                        {formatDate(payment.createdAt) + " " + formatHourAndMinute(payment.createdAt)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
            {<>
              <TotalAmount sumPayment={sumPayment} sumCons={sumCons} />
              {/* <ConsoLab /> */}
              <PaymentLab />
              <RemainAmount />
              {location.pathname.split("/")[3] === "payments" && 
              ((day.toString() === "jour" && month.toString() !== "mois") || day === 0) &&
                <>
                  <PercentageDoctor />
                  <PercentageCabinet />
                  <PurchaseOrderStats />
                  <ConsumptionStats />
                  <TotalRemainStats />
                </>
              }
            </>}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DataPayments


// .filter((payment: PaymentInterface) => {
//   const paymentDate = new Date(payment.createdAt);
//   if(showSwitchDate) {
//     return paymentDate >= startDate && paymentDate <= endDate;
//   } else {
//     if (day.toString() === "jour" && month.toString() !== "mois") {
//       const startDate = new Date(selectedDate);
//       startDate.setDate(1);
//       const endDate = new Date(selectedDate);
//       endDate.setDate(31);
//       return paymentDate >= startDate && paymentDate <= endDate;
//     }
//     if (month.toString() === "mois") {
//       const startDate = new Date(selectedDate);
//       startDate.setDate(1);
//       startDate.setMonth(0);
//       const endDate = new Date(selectedDate);
//       endDate.setDate(31);
//       endDate.setMonth(11);          
//       return paymentDate >= startDate && paymentDate <= endDate;
//     }
//     const selectedDateFormatted = formatDate(selectedDate.toString());
//     const paymentDateFormatted = formatDate(paymentDate.toString());

//     return paymentDateFormatted === selectedDateFormatted;
//   }
// })