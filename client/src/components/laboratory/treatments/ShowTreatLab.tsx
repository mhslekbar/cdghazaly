import React, { createContext, useState } from "react";
import DataTreatLab from "./DataTreatLab";
import AddTreatLab from "./AddTreatLab";
import { DefaultShowTreatLabInterface, DefaultTreatmentLabInterface } from "./types";
import EditTreatLab from "./EditTreatLab";
import DeleteTreatLab from "./DeleteTreatLab";

export const ShowTreatLabContext = createContext(DefaultShowTreatLabInterface);

const ShowTreatLab:React.FC = () => {
  const [showEditTLabModal, setShowEditTLabModal] = useState(false);
  const [showDeleteTLabModal, setShowDeleteTLabModal] = useState(false);
  const [selectedTreatLab, setSelectedTreatLab] = useState(DefaultTreatmentLabInterface);


  return (
    <ShowTreatLabContext.Provider
      value={{
        showEditTLabModal,
        setShowEditTLabModal,
        showDeleteTLabModal,
        setShowDeleteTLabModal,
        selectedTreatLab, 
        setSelectedTreatLab
      }}
    >
      <div className="mt-2">
        <AddTreatLab />
        <DataTreatLab />
        {showEditTLabModal && selectedTreatLab && <EditTreatLab TreatmentData={selectedTreatLab} modal={showEditTLabModal} toggle={() => setShowEditTLabModal(!showEditTLabModal)}/>}
        {showDeleteTLabModal && selectedTreatLab && <DeleteTreatLab TreatmentData={selectedTreatLab} modal={showDeleteTLabModal} toggle={() => setShowDeleteTLabModal(!showDeleteTLabModal)}/>}
      </div>
    </ShowTreatLabContext.Provider>
  );
};

export default ShowTreatLab;
