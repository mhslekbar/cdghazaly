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
import { FaChevronCircleLeft, FaPlus } from "react-icons/fa";
import { UserData } from "../../requestMethods";
import { useNavigate, useParams } from "react-router";

export const ShowLaboratoryContext = createContext(
  DefaultShowLaboratoryInterface
);

const ShowLaboratory: React.FC = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
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
      } catch {}
    }
    fetchLab()
  }, [dispatch]);

  const navigate = useNavigate()
  const { labId } = useParams()

  return (
    <ShowLaboratoryContext.Provider
      value={{
        showSuccessMsg, setShowSuccessMsg,
        showAddModal, setShowAddModal,
        showEditModal, setShowEditModal,
        showDeleteModal, setShowDeleteModal,
        selectedLaboratory, setSelectedLaboratory,
        selectedActionLab,  setSelectedActionLab,
        selectedDoctorLab,  setSelectedDoctorLab
      }}
    >
      {showSuccessMsg && (
        <SuccessMsg
          modal={showSuccessMsg}
          toggle={() => setShowSuccessMsg(!showSuccessMsg)}
        />
      )}
      <div className="flex justify-between gap-2">
        <div>
          {labId ? 
            <FaChevronCircleLeft className="text-main" style={{ fontSize: "30px" }} onClick={() => {
              setSelectedLaboratory(DefaultLaboratoryInterface)
              navigate("/laboratory")
            }}
            />
          :
          <div className="flex justify-start gap-2">
            <FaChevronCircleLeft style={{ fontSize: "30px" }} className="text-main" onClick={() => navigate("/")}/>
            <button className="bg-main p-2 rounded border" onClick={() => setShowAddModal(!showAddModal)}>
              <FaPlus />
            </button>
          </div>
        }
        </div>
        {UserData().doctor.cabinet && labId &&(
          <p className="bg-main py-2 px-4 rounded border">
            solde: {selectedLaboratory?.accounts?.find(acc => acc.doctor._id === UserData()._id)?.balance.toString()} 
          </p>
        )}
      </div>

      {showAddModal && 
        <AddLaboratory modal={showAddModal} toggle={() => setShowAddModal(!showAddModal)} />
      }

      {showEditModal && selectedLaboratory._id && (
        <EditLaboratory
          laboratory={selectedLaboratory}
          modal={showEditModal}
          toggle={() => setShowEditModal(!showEditModal)}
        />
      )}
      {showDeleteModal && selectedLaboratory._id && (
        <DeleteLaboratory
          laboratory={selectedLaboratory}
          modal={showDeleteModal}
          toggle={() => setShowDeleteModal(!showDeleteModal)}
        />
      )}
      {!labId && <DataLaboratory />}
      {labId && (
        <ManageLab laboratory={selectedLaboratory} />
      )}
    </ShowLaboratoryContext.Provider>
  );
};

export default ShowLaboratory;
