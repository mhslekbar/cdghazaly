import React, { useEffect, useState } from "react";
import InvoicesAssurance from "./InvoicesAssurance";
import { ShowPatientsAssuranceContext } from "./types";
import { DefaultInvoicesAssuranceInterface } from "../types";
import AddInvoiceAssurance from "./AddInvoiceAssurance";
import { useDispatch } from "react-redux";
import { ShowAssuranceApi } from "../../../redux/assurances/assuranceApiCalls";
import DeleteInvoiceAssurance from "./DeleteInvoiceAssurance";

const ShowPatientsAssurance: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(
    DefaultInvoicesAssuranceInterface
  );
  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false);

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
      }}
    >
      <div className="mt-2">
        <AddInvoiceAssurance />
        <InvoicesAssurance />
        {showDeleteInvoice && (
          <DeleteInvoiceAssurance
            InvoiceData={selectedInvoice}
            modal={showDeleteInvoice}
            toggle={() => setShowDeleteInvoice(!showDeleteInvoice)}
          />
        )}
      </div>
    </ShowPatientsAssuranceContext.Provider>
  );
};

export default ShowPatientsAssurance;
