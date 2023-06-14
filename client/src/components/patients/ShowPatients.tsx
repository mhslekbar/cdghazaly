import React, { useState } from "react";
import DataPatients from "./DataPatients";
import TypeFilterPatients from "./TypeFilterPatients";
import {
  DefaultPatientInterface,
  PatientInterface,
  ShowPatientsContext,
} from "./types";
import AddNewPatient from "./AddNewPatient";
import SuccessMsg from "../../Messages/SuccessMsg";
import EditPatient from "./EditPatient";
import DeletePatient from "./DeletePatient";
import PassPatient from "./PassPatient";

const ShowPatients: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientInterface>(
    DefaultPatientInterface
  );
  const [showSuccecMsg, setShowSuccecMsg] = useState(false);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [showDeletePatient, setShowDeletePatient] = useState(false);
  const [showPassPatient, setShowPassPatient] = useState(false);
      
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
    </ShowPatientsContext.Provider>
  );
};

export default ShowPatients;
