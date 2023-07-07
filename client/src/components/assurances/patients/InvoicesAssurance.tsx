import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShowPatientsAssuranceContext } from "./types";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import {
  AssuranceInterface,
  DefaultInvoicesAssuranceInterface,
  InvoicesAssuranceInterface,
} from "../types";
import { UserInterface } from "../../users/types";
import { InputCheckbox } from "../../../HtmlComponents/InputCheckbox";
import { MdRemoveCircleOutline } from "react-icons/md";
import { GiMeepleGroup } from "react-icons/gi"
import { get } from "../../../requestMethods";

const InvoicesAssurance: React.FC = () => {
  const { AssId, doctorId } = useParams();
  const [invoices, setInvoices] = useState<InvoicesAssuranceInterface[]>([
    DefaultInvoicesAssuranceInterface,
  ]);

  const { assurances } = useSelector((state: State) => state.assurances);

  const { setSelectedInvoice, selectedInvoice, setShowDeleteInvoice, setPayments } = useContext(ShowPatientsAssuranceContext);

  useEffect(() => {
    const dataAssurance: any = assurances.find(
      (ass: AssuranceInterface) => ass._id === AssId
    );
    setInvoices(dataAssurance
      .invoices
      .slice()
      .sort(
      (a: InvoicesAssuranceInterface, b: InvoicesAssuranceInterface) =>
          Number(b.numInvoice) - Number(a.numInvoice)
      )
    );
}, [assurances, AssId]);
  
  useEffect(() => {
    setSelectedInvoice(invoices?.find((invoice: InvoicesAssuranceInterface) => invoice.doctor.some(dc => dc._id === doctorId)) || invoices[0])
  }, [invoices, setSelectedInvoice, doctorId])

  const [archiveInvoice, setArchiveInvoice] = useState(false);

  const fetchAllPayments = async () => {
    try {
      const response = await get(`payment/all_payments`);
      setPayments(response.data.success);
    } catch (err) {
      console.log("err: ", err)
    }
  };
  
  const handleShowDeleteInvoice = (invoice: InvoicesAssuranceInterface) => {
    setShowDeleteInvoice(true)
    setSelectedInvoice(invoice)
  }

  return (
    <div className="mt-2">
      <InputCheckbox
        id="archiver"
        name="Afficher les Archives"
        value={archiveInvoice}
        setValue={setArchiveInvoice}
      />
      <section className="flex flex-row gap-2">
        {invoices.length > 0 &&
          invoices
            .filter(
              (invoice: InvoicesAssuranceInterface) =>
                invoice.doctor.find(
                  (doctor: UserInterface) => doctor._id === doctorId
                ) &&
                (invoice.finish === false ||
                  invoice.finish === archiveInvoice)
            )
            .map((invoice: InvoicesAssuranceInterface) => (
              <button
                title={invoice.inCommon === true ? "Facture commune entre " + invoice.doctor.map(dc => dc.username + " ") : ""}
                //  ${invoice.inCommon === true ? "text-main" : ""}
                className={`${invoice._id === selectedInvoice?._id ? "border-b-4 border-main" : ""} rounded bg-white px-4 py-2 uppercase w-1/6 flex justify-between`}
                onClick={() => {
                  setSelectedInvoice(invoice)
                  fetchAllPayments()
                }}
                key={invoice._id}
              >
                <span className="flex justify-center items-center gap-1">
                  {invoice.inCommon === true && 
                    <GiMeepleGroup/> 
                  }
                Facture-{invoice.numInvoice}</span>
                {!invoice.finish && 
                  <MdRemoveCircleOutline
                    onClick={() => handleShowDeleteInvoice(invoice)}
                    className="text-red"
                    style={{
                      fontSize: "22px",
                    }}
                  />
                }
              </button>
            ))}
      </section>
    </div>
  );
};

export default InvoicesAssurance;
