import React, { createContext, useEffect, useState } from "react";
import AddLaboratory from "./AddLaboratory";
import SuccessMsg from "../../Messages/SuccessMsg";
import {
  DefaultLaboratoryInterface,
  DefaultShowLaboratoryInterface,
  laboratoryInterface,
} from "./types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ShowLaboratoryApi } from "../../redux/laboratory/laboratoryApiCalls";
import DataLaboratory from "./DataLaboratory";
import EditLaboratory from "./EditLaboratory";
import DeleteLaboratory from "./DeleteLaboratory";
import ManageLab from "./ManageLab";
import { DefaultUserInterface, UserInterface } from "../users/types";

export const ShowLaboratoryContext = createContext(
  DefaultShowLaboratoryInterface
);

const ShowLaboratory: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedLaboratory, setSelectedLaboratory] =
    useState<laboratoryInterface>(DefaultLaboratoryInterface);

  const [selectedActionLab, setSelectedActionLab] = useState("")
  const [selectedDoctorLab, setSelectedDoctorLab] = useState<UserInterface>(DefaultUserInterface)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const boundActions = bindActionCreators({ ShowLaboratoryApi }, dispatch);
        await boundActions.ShowLaboratoryApi();
      }catch {}
    }
    fetchLab()
  }, [dispatch]);

  return (
    <ShowLaboratoryContext.Provider
      value={{
        showSuccessMsg,
        setShowSuccessMsg,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        selectedLaboratory,
        setSelectedLaboratory,
        selectedActionLab, 
        setSelectedActionLab,
        selectedDoctorLab, 
        setSelectedDoctorLab
      }}
    >
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <AddLaboratory />
      {showEditModal && selectedLaboratory.name.length > 0 && (
        <EditLaboratory
          laboratory={selectedLaboratory}
          modal={showEditModal}
          toggle={() => setShowEditModal(!showEditModal)}
        />
      )}
      {showDeleteModal && selectedLaboratory.name.length > 0 && (
        <DeleteLaboratory
          laboratory={selectedLaboratory}
          modal={showDeleteModal}
          toggle={() => setShowDeleteModal(!showDeleteModal)}
        />
      )}
      <DataLaboratory />
      {selectedLaboratory.name.length > 0 && (
        <ManageLab laboratory={selectedLaboratory} />
      )}
    </ShowLaboratoryContext.Provider>
  );
};

export default ShowLaboratory;
