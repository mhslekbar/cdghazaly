import React, { useState } from "react";
import Links from './Links'
import SuccessMsg from "../../Messages/SuccessMsg";

import { DefaultFilterPatientType, DefaultPatientInterface, PatientInterface, ShowPatientsContext, filterPatientType } from "../patients/types";

const HomePageData: React.FC = () => {
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

      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      {/* Start Here  */}
      <Links />
      {/* Finish Here  */}

    </ShowPatientsContext.Provider>
  );
};

export default HomePageData;
