import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import {
  DefaultInvoicesInterface,
  InvoicesInterface,
  LineInvoiceInterface,
  ShowInvoicesContext,
} from "./types";
import FilterTypeInvoice from "./FilterTypeInvoice";
import { useParams } from "react-router";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";
import TotalFacture from "./TotalFacture";
import HeaderInvoice from "../HeaderInvoice";

const DataInvoice: React.FC = () => {
  const { invoices } = useSelector((state: State) => state.invoices);

  const { selectedInvoice, setSelectedInvoice, typeInvoice } =
    useContext(ShowInvoicesContext);

  useEffect(() => {
    const SInvoice: InvoicesInterface =
      invoices.find((dv: any) => dv._id === selectedInvoice?._id) ||
      DefaultInvoicesInterface;
    setSelectedInvoice(SInvoice.numInvoice ? SInvoice : invoices[0]);
  }, [invoices, setSelectedInvoice, selectedInvoice]);

  const [patientInfo, setPatientInfo] = useState<PatientInterface>(DefaultPatientInterface)
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  useEffect(() => {
    setPatientInfo(patients.find((patient: PatientInterface) => patient._id === patientId) || DefaultPatientInterface)
  }, [patients, patientId])

  return (
    <>
      {selectedInvoice && <>
        {patientInfo?.assurance?.society && <FilterTypeInvoice />}
        <div className="flex flex-col col-start-2 col-span-4 invoice print:w-full">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <HeaderInvoice type={`Facture N-${selectedInvoice.numInvoice}`} PatientInfo={patientInfo}/>            
                <table className="min-w-full text-left text-sm font-light text-center">
                  <thead className="border font-medium bg-white text-black border-gray-950">
                    <tr>
                      <th className="px-3 py-2 border-r border-gray-950">Traitment</th>
                      <th className="px-3 py-2 border-r border-gray-950">Dents</th>
                      <th className="px-3 py-2 border-r border-gray-950">Surface</th>
                      <th className="px-3 py-2 border-r border-gray-950">NBS</th>
                      <th className="px-3 py-2 border-r border-gray-950">Prix.U</th>
                      <th className="px-3 py-2 border-r border-gray-950">total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice?.LineInvoice?.filter(
                      (lnInvoice: LineInvoiceInterface) => {
                        if (typeInvoice === "assuré") {
                          return lnInvoice.treatment.assurance;
                        } else if (typeInvoice === "cabinet") {
                          return !lnInvoice.treatment.assurance;
                        }
                        return true;
                      }
                    )?.map((lnInvoice: LineInvoiceInterface, index) => {
                      // const price = patientInfo.assurance ? lnInvoice.price * (Number(patientInfo.assurance?.percentCovered) / 100) : lnInvoice.price
                      const price = lnInvoice.price
                      const totalPrice = price * lnInvoice.teeth.nums.length
                      return (
                        <tr className="border-b border-l border-gray-950" key={index}>
                          <td className="whitespace-nowrap px-3 py-2 border-r border-gray-950 bg-white font-medium text-start">
                            {lnInvoice.treatment?.name}
                          </td>
                          <td className="whitespace-normal px-3 py-2 border-r border-gray-950 bg-white font-medium w-36 whitesp">
                            {lnInvoice.teeth.nums.map(
                              (num: string, index) =>
                                num +
                                (index < lnInvoice.teeth.nums.length - 1
                                  ? ", "
                                  : "")
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 border-r border-gray-950 bg-white font-medium">
                            {lnInvoice.teeth.surface}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 border-r border-gray-950 bg-white font-medium">
                            {lnInvoice.teeth.nums.length}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 border-r border-gray-950 bg-white font-medium">
                            {price}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 border-r border-gray-950 bg-white font-medium">
                            {totalPrice}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    {patientInfo.assurance?.professionalId && typeInvoice === "global" && <>
                      <TotalFacture patientInfo={patientInfo} selectedInvoice={selectedInvoice} typeInvoice={typeInvoice} message="Payé par l'Assurance" paymentType="assurance" />
                      <TotalFacture patientInfo={patientInfo} selectedInvoice={selectedInvoice} typeInvoice={typeInvoice} message="Payé Par le patient" paymentType="patient" />
                    </>}
                    <TotalFacture patientInfo={patientInfo} selectedInvoice={selectedInvoice} typeInvoice={typeInvoice} message="Total" paymentType="total" />
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default DataInvoice;
