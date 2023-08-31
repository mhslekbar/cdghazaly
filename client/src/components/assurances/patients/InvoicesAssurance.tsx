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
import { InputCheckbox } from "../../../HtmlComponents/InputCheckbox";
import { MdAttachMoney, MdRemoveCircleOutline } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import { PermissionType } from "../../roles/types";

const InvoicesAssurance: React.FC = () => {
  const { AssId, doctorId } = useParams();
  const [invoices, setInvoices] = useState<InvoicesAssuranceInterface[]>([
    DefaultInvoicesAssuranceInterface,
  ]);

  const { assurances } = useSelector((state: State) => state.assurances);

  const {
    setSelectedInvoice, selectedInvoice,
    setShowDeleteInvoice, 
    factureGlobal, setFactureGlobal,
    setShowPayInvoice,
  } = useContext(ShowPatientsAssuranceContext);

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
    setSelectedInvoice(invoices[0])
  }, [invoices, setSelectedInvoice, doctorId])

  const [archiveInvoice, setArchiveInvoice] = useState(false);

  
  const handleShowDeleteInvoice = (invoice: InvoicesAssuranceInterface) => {
    setShowDeleteInvoice(true)
    setSelectedInvoice(invoice)
  }

  const handleShowPayInvoice = (invoice: InvoicesAssuranceInterface) => {
    setShowPayInvoice(true)
    setSelectedInvoice(invoice)
  }

  const { permissions } = useSelector((state: State) => state.permissions)

  return (
    <div className="mt-2">
      <div className="flex justify-start gap-2">
        <InputCheckbox
          id="archiver"
          name="Afficher les Archives"
          value={archiveInvoice}
          setValue={setArchiveInvoice}
        />
        {permissions.find(
          (permission: PermissionType) =>
            permission.name === "FACTURE_GLOBAL" &&
            permission.collectionName === "PATIENTS_ASSURANCE"
        ) && <InputCheckbox
          id="FGlobal"
          name="Facture Global"
          value={factureGlobal}
          setValue={setFactureGlobal}
        />}        
        <FaPrint className="text-blue mt-2" style={{ fontSize: "22px" }} onClick={() => window.print()}/>
      </div>
      <section className="flex flex-row gap-2">
        {invoices.length > 0 &&
          invoices
            .filter(
              (invoice: InvoicesAssuranceInterface) =>
                (invoice.finish === false ||
                  invoice.finish === archiveInvoice)
            )
            .map((invoice: InvoicesAssuranceInterface) => (
              <div
                className={`${invoice?._id === selectedInvoice?._id ? "border-b-4 border-main" : ""} rounded bg-white px-4 py-2 w-1/6 flex justify-between`}
                onClick={() => {
                  setSelectedInvoice(invoice)
                }}
                key={invoice._id}
              >
                <span className="flex justify-center items-center gap-1 xs:text-xs md:text-md">                 
                  Facture-{invoice.numInvoice}
                </span>
                {(!invoice.finish) && 
                  <MdRemoveCircleOutline
                    onClick={() => handleShowDeleteInvoice(invoice)}
                    className="text-red xs:text-md md:text-xl"
                  />
                }
                {!invoice.payed && 
                  <button className="bg-blue rounded-lg border" onClick={() => handleShowPayInvoice(invoice)}>
                    <MdAttachMoney 
                      className="xs:text-md md:text-xl"
                    />
                  </button>
                }
              </div>
            ))}
      </section>
    </div>
  );
};

export default InvoicesAssurance;
