import React, { useContext } from 'react'
import { EnumTypePayment, PaymentInterface } from '../../ManagePatient/Payments/types'
import { useLocation, useParams } from 'react-router'
import { RegNo, formatDate } from '../../../functions/functions'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { ShowStatisticContext } from '../types'
import ConsoLab from './ConsoLab'
import TotalAmount from './TotalAmount'
import RemainAmount from './RemainAmount'
import PercentageDoctor from './PercentageDoctor'
import PercentageCabinet from './PercentageCabinet'

interface DataPaymentInterface {
  paymentFilter: string
}

const DataPayments:React.FC<DataPaymentInterface> = ({ paymentFilter }) => {
  const { payments } = useSelector((state: State) => state.payments);
  const { doctorId } = useParams()
  let sumCons = 0
  let sumPayment = 0
  const { selectedDate, day, month, showSwitchDate, startDate, endDate } = useContext(ShowStatisticContext)
  const location = useLocation()

  const filteredPayment = paymentFilter === "payment" ? EnumTypePayment.PAYMENT : EnumTypePayment.SOINS
  return (
    <div className="col-span-2 flex flex-col border">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light text-center">
            <thead className="border-b font-medium bg-main text-white">
              <tr>
                <th className="px-6 py-4 border-r">Doss.No</th>
                <th className="px-6 py-4 border-r">Nom</th>
                <th className="px-6 py-4 border-r">Consultation</th>
                <th className="px-6 py-4">{paymentFilter === "payment" ? "Versement" : paymentFilter === "soins" ?  "soins" : ""}</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .filter(
                  (payment: PaymentInterface) => 
                  payment.doctor._id === doctorId 
                  && (payment.type === paymentFilter || payment.type === "consultations")
                  && (payment.invoiceAssur ? payment.invoiceAssur?.payed : payment)
                )
                .filter((payment: PaymentInterface) => {
                  const paymentDate = new Date(payment.createdAt);
                  if(showSwitchDate) {
                    return paymentDate >= startDate && paymentDate <= endDate;
                  } else {
                    if (day.toString() === "jour" && month.toString() !== "mois") {
                      const startDate = new Date(selectedDate);
                      startDate.setDate(1);
                      const endDate = new Date(selectedDate);
                      endDate.setDate(31);
                      return paymentDate >= startDate && paymentDate <= endDate;
                    }
                    if (month.toString() === "mois") {
                      const startDate = new Date(selectedDate);
                      startDate.setDate(1);
                      startDate.setMonth(0);
                      const endDate = new Date(selectedDate);
                      endDate.setDate(31);
                      endDate.setMonth(11);          
                      return paymentDate >= startDate && paymentDate <= endDate;
                    }
                    const selectedDateFormatted = formatDate(selectedDate.toString());
                    const paymentDateFormatted = formatDate(paymentDate.toString());
  
                    return paymentDateFormatted === selectedDateFormatted;
                  }
                })
                .sort((a: PaymentInterface, b: PaymentInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((payment: PaymentInterface, index) => {
                  sumCons += payment.type === EnumTypePayment.CONSULTATION ? payment.amount : 0
                  sumPayment += payment.type === filteredPayment ? payment.amount : 0
                  return (
                    <tr className="border-b" key={index}>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {payment.patient?.RegNo
                          ? RegNo(payment.patient?.RegNo)
                          : "0000"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {payment.patient?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {payment.type === EnumTypePayment.CONSULTATION &&
                          payment.amount}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {payment.type === filteredPayment &&
                          payment.amount}
                      </td>
                    </tr>
                  );
                })}
                <TotalAmount sumPayment={sumPayment} sumCons={sumCons} />
                <ConsoLab />
                <RemainAmount />
                {location.pathname.split("/")[3] === "payments" && day.toString() === "jour" && month.toString() !== "mois" &&
                  <>
                    <PercentageDoctor />
                    <PercentageCabinet />
                  </>
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DataPayments
