import React, { useEffect, useState } from "react";
import Links from './Links'
import SuccessMsg from "../../Messages/SuccessMsg";

import { DefaultFilterPatientType, DefaultPatientInterface, PatientInterface, ShowPatientsContext, filterPatientType } from "../patients/types";
import { useDispatch } from "react-redux";
import { ShowPatientsApi } from "../../redux/patients/patientApiCalls";

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
  const [showWhatsAppPatient, setShowWhatsAppPatient] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  
  const [filterPatient, setFilterPatient] = useState<filterPatientType>(DefaultFilterPatientType);
  const dispatch: any = useDispatch()

  useEffect(() => {
    const fetchPatient = async () => {
      await dispatch(ShowPatientsApi());
    };
    fetchPatient();
  }, [dispatch])

  return (
    <ShowPatientsContext.Provider
      value={{
        selectedFilter, setSelectedFilter,
        showSuccessMsg, setShowSuccessMsg,
        showEditPatient, setShowEditPatient,
        showDeletePatient, setShowDeletePatient,
        selectedPatient, setSelectedPatient,
        showPassPatient, setShowPassPatient,
        showFinishPatient, setShowFinishPatient,
        showReturnPatient, setShowReturnPatient,
        showWhatsAppPatient, setShowWhatsAppPatient,
        filterPatient, setFilterPatient,
        showAddPatient, setShowAddPatient,
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
