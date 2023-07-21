import React, { useContext, useEffect, useState } from "react";
import InvoicesAssurance from "./InvoicesAssurance";
import { ShowPatientsAssuranceContext } from "./types";
import { DefaultInvoicesAssuranceInterface, ShowAssurancesContext } from "../types";
import AddInvoiceAssurance from "./AddInvoiceAssurance";
import { useDispatch } from "react-redux";
import { ShowAssuranceApi } from "../../../redux/assurances/assuranceApiCalls";
import DeleteInvoiceAssurance from "./DeleteInvoiceAssurance";
import DataPatientAssurance from "./DataPatientAssurance";
import PayInvoiceAssurance from "./PayInvoiceAssurance";

const ShowPatientsAssurance: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(
    DefaultInvoicesAssuranceInterface
  );

  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false);
  const [showPayInvoice, setShowPayInvoice] = useState(false);
  const [factureGlobal, setFactureGlobal] = useState(false);

  const { selectedDoctor } = useContext(ShowAssurancesContext)

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchAss = async () => {
      await dispatch(ShowAssuranceApi());
    };
    fetchAss();
  }, [dispatch]);

  return (
    <ShowPatientsAssuranceContext.Provider
      value={{
        selectedInvoice,
        setSelectedInvoice,
        showDeleteInvoice,
        setShowDeleteInvoice,
        showPayInvoice, setShowPayInvoice,
        factureGlobal, setFactureGlobal
      }}
    >
      <div className="mt-2">
        <h1 className="text-center text-2xl text-gray-700 font-bold">{selectedDoctor.username}</h1>
        <AddInvoiceAssurance />
        <InvoicesAssurance />
        <DataPatientAssurance />
        {showDeleteInvoice && (
          <DeleteInvoiceAssurance
            InvoiceData={selectedInvoice}
            modal={showDeleteInvoice}
            toggle={() => setShowDeleteInvoice(!showDeleteInvoice)}
          />
        )}
        {showPayInvoice && (
          <PayInvoiceAssurance
            InvoiceData={selectedInvoice}
            modal={showPayInvoice}
            toggle={() => setShowPayInvoice(!showPayInvoice)}
          />
        )}
      </div>
      
    </ShowPatientsAssuranceContext.Provider>
  );
};

export default ShowPatientsAssurance;
