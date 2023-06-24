import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowDevisApi } from "../../../redux/devis/devisApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useParams } from "react-router";
import { DefaultInvoicesInterface, InvoicesInterface, LineInvoiceInterface, ShowInvoicesContext } from "./types";

const DataInvoice: React.FC = () => {
  const { invoices } = useSelector((state: State) => state.invoices);
  const { patientId } = useParams()

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchDevis = async () => {
      dispatch(ShowDevisApi(patientId));
    };
    fetchDevis();
  }, [dispatch, patientId]);

  const { selectedInvoice, setSelectedInvoice } = useContext(ShowInvoicesContext)

  useEffect(() => {
    const SInvoice: InvoicesInterface = invoices.find((dv: any) => dv._id === selectedInvoice?._id) || DefaultInvoicesInterface
    setSelectedInvoice(SInvoice.numInvoice ? SInvoice : invoices[0])
  }, [invoices, setSelectedInvoice, selectedInvoice])

  return (
    <>
      {selectedInvoice  &&
      <div className="flex flex-col col-start-2 col-span-4 invoice print:w-full">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-3 py-2 border-r">Traitment</th>
                  <th className="px-3 py-2 border-r">Dents</th>
                  <th className="px-3 py-2 border-r">Surface</th>
                  <th className="px-3 py-2 border-r">NBS</th>
                  <th className="px-3 py-2 border-r">Price</th>
                  <th className="px-3 py-2 border-r">total</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice?.LineInvoice?.map((lnDevis: LineInvoiceInterface, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium text-start">
                      {lnDevis.treatment?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.nums.map((num: string, index) => num + (index < lnDevis.teeth.nums.length - 1 ? ", " : ""))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.surface}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.nums.length}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.price * lnDevis.teeth.nums.length}
                    </td>
                  </tr>
                ))}
                <tr className="text-end">
                  <td colSpan={4}></td>
                  <td className="whitespace-nowrap px-3 py-2 bg-white font-medium">Total: </td>
                  <td className="whitespace-nowrap px-3 py-2 bg-white font-medium">
                    {selectedInvoice?.LineInvoice.reduce((acc: any, currVal: LineInvoiceInterface) => (currVal.price * currVal.teeth.nums.length) + acc, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      }
    </>

  );
};

export default DataInvoice;
