import React, { useState } from "react";
import DataPatients from "./DataPatients";
import TypeFilterPatients from "./TypeFilterPatients";
import {
  DefaultPatientInterface,
  PatientInterface,
  ShowPatientsContext,
} from "./types";
import SuccessMsg from "../../Messages/SuccessMsg";
import AddNewPatient from "./controls/AddNewPatient";
import EditPatient from "./controls/EditPatient";
import DeletePatient from "./controls/DeletePatient";
import PassPatient from "./controls/PassPatient";
import FinishPatient from "./controls/FinishPatient";


const ShowPatients: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientInterface>(
    DefaultPatientInterface
  );
  const [showSuccecMsg, setShowSuccecMsg] = useState(false);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [showDeletePatient, setShowDeletePatient] = useState(false);
  const [showPassPatient, setShowPassPatient] = useState(false);
  const [showFinishPatient, setShowFinishPatient] = useState(false);
      
  return (
    <ShowPatientsContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
        showSuccecMsg,
        setShowSuccecMsg,
        showEditPatient,
        setShowEditPatient,
        showDeletePatient,
        setShowDeletePatient,
        selectedPatient,
        setSelectedPatient,
        showPassPatient,
        setShowPassPatient,
        showFinishPatient,
        setShowFinishPatient
      }}
    >
      {showSuccecMsg && (
        <SuccessMsg
          modal={showSuccecMsg}
          toggle={() => setShowSuccecMsg(!showSuccecMsg)}
        />
      )}
      <TypeFilterPatients />
      <AddNewPatient />
      <DataPatients />
      {showEditPatient && selectedPatient && (
        <EditPatient
          patientData={selectedPatient}
          modal={showEditPatient}
          toggle={() => setShowEditPatient(!showEditPatient)}
        />
      )}
      {showDeletePatient && selectedPatient && (
        <DeletePatient
          patientData={selectedPatient}
          modal={showDeletePatient}
          toggle={() => setShowDeletePatient(!showDeletePatient)}
        />
      )}
      {showPassPatient && selectedPatient && (
        <PassPatient
          modal={showPassPatient}
          toggle={() => setShowPassPatient(!showPassPatient)}
          patientData={selectedPatient}
        />
      )}
      {showFinishPatient && selectedPatient && (
        <FinishPatient
          modal={showFinishPatient}
          toggle={() => setShowFinishPatient(!showFinishPatient)}
          patientData={selectedPatient}
        />
      )}
    </ShowPatientsContext.Provider>
  );
};

export default ShowPatients;
