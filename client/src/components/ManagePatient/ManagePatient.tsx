import React, { useState } from "react";
import SuccessMsg from "../../Messages/SuccessMsg";
import { DefaultFilterPatientType, DefaultPatientInterface, PatientInterface, ShowPatientsContext, filterPatientType } from "../patients/types";
import EditPatient from "../patients/controls/EditPatient";
import DeletePatient from "../patients/controls/DeletePatient";
import PassPatient from "../patients/controls/PassPatient";
import FinishPatient from "../patients/controls/FinishPatient";
import ReturnPatient from "../patients/controls/ReturnPatient";


import HeaderInfoPatient from './HeaderInfoPatient'
import LinksPatient from './LinksPatient'
import { ManagePatientContext } from './types'


const ManagePatient: React.FC = () => {
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
      
  const [selectedLink, setSelectedLink] = useState("")

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
    <ManagePatientContext.Provider value={{
      selectedLink, setSelectedLink
    }}>
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <HeaderInfoPatient />
      <LinksPatient />
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

      </ManagePatientContext.Provider>
    </ShowPatientsContext.Provider>
  );
};

export default ManagePatient;


// import React, { useState } from 'react'
// import HeaderInfoPatient from './HeaderInfoPatient'
// import LinksPatient from './LinksPatient'
// import { ManagePatientContext } from './types'

// const ManagePatient:React.FC = () => {
//   const [selectedLink, setSelectedLink] = useState("")
//   return (
//     <ManagePatientContext.Provider value={{
//       selectedLink, setSelectedLink
//     }}>
//       <HeaderInfoPatient />
//       <LinksPatient />
//     </ManagePatientContext.Provider>
//   )
// }

// export default ManagePatient
