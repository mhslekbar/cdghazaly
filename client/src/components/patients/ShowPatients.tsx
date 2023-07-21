import React, { useState } from "react";
import DataPatients from "./DataPatients";
import TypeFilterPatients from "./TypeFilterPatients";
import {
  DefaultFilterPatientType,
  DefaultPatientInterface,
  PatientInterface,
  ShowPatientsContext,
  filterPatientType,
} from "./types";
import SuccessMsg from "../../Messages/SuccessMsg";
import AddNewPatient from "./controls/AddNewPatient";
import EditPatient from "./controls/EditPatient";
import DeletePatient from "./controls/DeletePatient";
import PassPatient from "./controls/PassPatient";
import FinishPatient from "./controls/FinishPatient";
import ReturnPatient from "./controls/ReturnPatient";
import SearchPatients from "./SearchPatients";
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const ShowPatients: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientInterface>(
    DefaultPatientInterface
  );
  
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [showDeletePatient, setShowDeletePatient] = useState(false);
  const [showPassPatient, setShowPassPatient] = useState(false);
  const [showFinishPatient, setShowFinishPatient] = useState(false);
  const [showReturnPatient, setShowReturnPatient] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  
  const [filterPatient, setFilterPatient] = useState<filterPatientType>(DefaultFilterPatientType);
     
  const navigate = useNavigate()

  return (
    <ShowPatientsContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
        showSuccessMsg, setShowSuccessMsg,
        showEditPatient,
        setShowEditPatient,
        showDeletePatient,
        setShowDeletePatient,
        selectedPatient,
        setSelectedPatient,
        showPassPatient,
        setShowPassPatient,
        showFinishPatient,
        setShowFinishPatient,
        showReturnPatient, 
        setShowReturnPatient,
        filterPatient,
        setFilterPatient,
        showAddPatient, setShowAddPatient
      }}
    >
      <div className="flex justify-start gap-2 mb-2">
        <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
        <button className="p-2 rounded btn-main" onClick={() => setShowAddPatient(!showAddPatient)}>
          <FaPlus />
        </button>
      </div>
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <SearchPatients />
      <TypeFilterPatients />

      <AddNewPatient modal={showAddPatient} toggle={() => setShowAddPatient(!showAddPatient)}/>

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
      {showReturnPatient && selectedPatient && (
        <ReturnPatient
          modal={showReturnPatient}
          toggle={() => setShowReturnPatient(!showReturnPatient)}
          patientData={selectedPatient}
        />
      )}
    </ShowPatientsContext.Provider>
  );
};

export default ShowPatients;
