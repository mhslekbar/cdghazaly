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

const InvoicesAssurance: React.FC = () => {
  const { AssId, doctorId } = useParams();
  const [invoices, setInvoices] = useState<InvoicesAssuranceInterface[]>([
    DefaultInvoicesAssuranceInterface,
  ]);

  const { assurances } = useSelector((state: State) => state.assurances);

  const { setSelectedInvoice, setShowDeleteInvoice } = useContext(ShowPatientsAssuranceContext);

  useEffect(() => {
    const dataAssurance: any = assurances.find(
      (ass: AssuranceInterface) => ass._id === AssId
    );
    setInvoices(dataAssurance.invoices);
  }, [assurances, AssId]);

  const [archiveInvoice, setArchiveInvoice] = useState(false);

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
      <section className="flex flex-row">
        {invoices.length > 0 &&
          invoices
            .filter(
              (invoice: InvoicesAssuranceInterface) =>
                invoice.doctor.find(
                  (doctor: UserInterface) => doctor._id === doctorId
                ) &&
                (invoice.finish === 0 ||
                  invoice.finish === (archiveInvoice === false ? 0 : 1))
            )
            .sort(
              (a: InvoicesAssuranceInterface, b: InvoicesAssuranceInterface) =>
                Number(b.numInvoice) - Number(a.numInvoice)
            )
            .map((invoice: InvoicesAssuranceInterface) => (
              <button
                title={invoice.inCommon === true ? "Facture commune entre " + invoice.doctor.map(dc => dc.username + " ") : ""}
                className={`${invoice.inCommon === true ? "text-main" : ""} rounded border bg-white px-4 py-2 uppercase w-1/6 flex justify-between`}
                onClick={() => setSelectedInvoice(invoice)}
                key={invoice._id}
              >
                <span>Facture-{invoice.numInvoice}</span>
                <MdRemoveCircleOutline
                  onClick={() => handleShowDeleteInvoice(invoice)}
                  className="text-red"
                  style={{
                    fontSize: "22px",
                  }}
                />
              </button>
            ))}
      </section>
    </div>
  );
};

export default InvoicesAssurance;
