import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowInvoicesApi } from '../../../redux/invoices/invoiceApiCalls'
import { useSelector } from 'react-redux'
import { State } from '../../../redux/store'
import { InvoicesInterface, LineInvoiceInterface } from '../../ManagePatient/Invoices/types'
import { useParams } from 'react-router'

const StatisticTreatments:React.FC = () => {
  const dispatch: any = useDispatch()
  const { invoices } = useSelector((state: State) => state.invoices)

  useEffect(() => {
    const fetchInvoices = async () => {
      await dispatch(ShowInvoicesApi())
    }
    fetchInvoices()
  }, [dispatch])

  const [groupedData, setGroupedData] = useState<any>({});
  const { doctorId } = useParams();

  useEffect(() => {
    // Grouping the data by treatment
    const updatedGroupedData: any = {};
    invoices
      .filter((invoice: InvoicesInterface) => invoice.LineInvoice
      .find((ln: LineInvoiceInterface) => ln.doctor._id === doctorId))
      .forEach((invoice) => {
      invoice.LineInvoice.forEach((line: LineInvoiceInterface) => {
        const { treatment } = line;
        if (treatment.name in updatedGroupedData) {
          updatedGroupedData[treatment.name].push(line);
        } else {
          updatedGroupedData[treatment.name] = [line];
        }
      });
    });
    setGroupedData(updatedGroupedData);
  }, [invoices, doctorId]);

  // Rest of your component code
  const [SumTotalNbrs, setSumTotalNbrs] = useState<number>(0)

  useEffect(() => {
    const ArrayGrp = Object.entries(groupedData)
    .map(([treatment, lines], index) => (lines as LineInvoiceInterface[]).reduce((acc, line: LineInvoiceInterface) => acc + line.teeth.nums.length, 0)) 
    setSumTotalNbrs(ArrayGrp.reduce((acc, currVal) => acc + currVal, 0))
  }, [groupedData])

  return (
    <div className="flex flex-col border mt-3">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden invoice">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border border-gray-950 font-medium bg-main text-white text-center">
              <tr>
                <th className="px-6 py-4 border-r border-gray-950">Traitement</th>
                <th className="px-6 py-4 border-r border-gray-950">Nbrs</th>
                <th className="px-6 py-4">Pourcentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData)
              .sort(([treatmentA], [treatmentB]) => treatmentA.localeCompare(treatmentB))
              .map(([treatment, lines], index) => (
                <tr className="border border-gray-950" key={index}>
                  <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium">
                    {treatment}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium text-center">
                    {(lines as LineInvoiceInterface[]).reduce((acc, line: LineInvoiceInterface) => acc + line.teeth.nums.length, 0)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 border-r border-gray-950 bg-white font-medium text-center">
                    {((lines as LineInvoiceInterface[]).reduce((acc, line: LineInvoiceInterface) => acc + line.teeth.nums.length, 0) * 100 / SumTotalNbrs)?.toFixed(2) + "%"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StatisticTreatments
