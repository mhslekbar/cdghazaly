import React, { useEffect, useRef, useState } from "react";
import InvoicesAssurance from "./InvoicesAssurance";
import { ShowPatientsAssuranceContext } from "./types";
import { DefaultInvoicesAssuranceInterface } from "../types";
import AddInvoiceAssurance from "./AddInvoiceAssurance";
import { useDispatch } from "react-redux";
import { ShowAssuranceApi } from "../../../redux/assurances/assuranceApiCalls";
import DeleteInvoiceAssurance from "./DeleteInvoiceAssurance";
import DataPatientAssurance from "./DataPatientAssurance";
import PayInvoiceAssurance from "./PayInvoiceAssurance";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { DefaultUserInterface, UserInterface } from "../../users/types";
import { useParams } from "react-router";
import PrintModal from "./PrintModal";

const ShowPatientsAssurance: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(
    DefaultInvoicesAssuranceInterface
  );

  const [showDeleteInvoice, setShowDeleteInvoice] = useState(false);
  const [showPayInvoice, setShowPayInvoice] = useState(false);
  const [factureGlobal, setFactureGlobal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [invoiceType, setInvoiceType] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const { users } = useSelector((state: State) => state.users)

  const [selectedDoctor, setSelectedDoctor] = useState<UserInterface>(DefaultUserInterface)

  const { doctorId } = useParams()

  useEffect(() => {
    setSelectedDoctor(users.find((user: UserInterface) => user.doctor?.cabinet && user._id === doctorId) ?? DefaultUserInterface)
  }, [users, doctorId])

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchAss = async () => {
      await dispatch(ShowAssuranceApi());
    };
    fetchAss();
  }, [dispatch]);

  const patientAssRef = useRef(null)

  return (
    <ShowPatientsAssuranceContext.Provider
      value={{
        selectedInvoice,
        setSelectedInvoice,
        showDeleteInvoice,
        setShowDeleteInvoice,
        showPayInvoice, setShowPayInvoice,
        factureGlobal, setFactureGlobal,
        showPrintModal, setShowPrintModal,
        selectedPatient, setSelectedPatient,
        invoiceType, setInvoiceType,
        patientAssRef
      }}
    >
      <div className="mt-2">
        <h1 className="text-center md:text-2xl text-gray-700 font-bold">{selectedDoctor.username}</h1>
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

        {showPrintModal && <PrintModal modal={showPrintModal} toggle={() => setShowPrintModal(!showPrintModal)} />}

      </div>
      
    </ShowPatientsAssuranceContext.Provider>
  );
};

export default ShowPatientsAssurance;
