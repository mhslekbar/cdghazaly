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
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";
import TotalFacture from "./TotalFacture";
import HeaderInvoice from "../HeaderInvoice";
import FooterInvoice from "../FooterInvoice";
import { useTranslation } from "react-i18next";

const DataInvoice: React.FC = () => {
  const { invoices } = useSelector((state: State) => state.invoices);

  const { selectedInvoice, setSelectedInvoice, typeInvoice, selectedPatient, invoiceRef } =
    useContext(ShowInvoicesContext);

  useEffect(() => {
    const SInvoice: InvoicesInterface =
      invoices
      .find((inv: InvoicesInterface) => inv.patient?._id === selectedPatient) || DefaultInvoicesInterface
      // .filter((inv: InvoicesInterface) => inv.patient?._id === selectedPatient)
      // .find((inv: any) => inv._id === selectedInvoice?._id) || DefaultInvoicesInterface;
    setSelectedInvoice(SInvoice.numInvoice ? SInvoice : invoices[0]);
  }, [invoices, setSelectedInvoice, selectedPatient]);

  const [patientInfo, setPatientInfo] = useState<PatientInterface>(DefaultPatientInterface)
  const { patients } = useSelector((state: State) => state.patients)

  useEffect(() => {
    setPatientInfo(patients.find((patient: PatientInterface) => patient._id === selectedPatient) || DefaultPatientInterface)
  }, [patients, selectedPatient])
  
  const { t } = useTranslation()

  return (
    <>
      {selectedInvoice && <>
        {patientInfo?.assurance?.society && <FilterTypeInvoice />}
        <div className="flex flex-col col-start-2 col-span-4 print:w-full">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden invoice flex flex-col" ref={invoiceRef} style={{ minHeight: '100vh' }}>
                <HeaderInvoice type={`Facture N-${selectedInvoice.numInvoice}`} PatientInfo={patientInfo}/>            
              <section className="content-invoice" style={{ flex: 1 }}>
                <table className="min-w-full text-sm font-light text-center">
                  <thead className="border font-medium bg-white text-black border-gray-950">
                    <tr>
                      <th className="px-2 py-2 border-r border-gray-950">{t("Traitement")}</th>
                      <th className="px-2 py-2 border-r border-gray-950">{t("Dents")}</th>
                      <th className="px-2 py-2 border-r border-gray-950">{t("Surface")}</th>
                      <th className="px-2 py-2 border-r border-gray-950">{t("NBS")}</th>
                      <th className="px-2 py-2 border-r border-gray-950">{t("Prix.U")}</th>
                      <th className="px-2 py-2 border-r border-gray-950">{t("Total")}</th>
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
                </section>
                <FooterInvoice />
              </div>
            </div>
          </div>
        </div>
      </>}
    </>
  );
};

export default DataInvoice;
