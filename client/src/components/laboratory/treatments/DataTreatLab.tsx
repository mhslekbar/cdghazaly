import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { TreatmentLabInterface } from "./types";
import { ShowTreatLabContext } from "./ShowTreatLab";
import { useDispatch } from "react-redux";
import { ShowTreatmentLabApi } from "../../../redux/laboratory/treatments/labTreatApiCalls";
import { ShowTreatmentApi } from "../../../redux/treatments/treatmentApiCalls";

const DataLabTreats: React.FC = () => {
  const { treatmentLab } = useSelector((state: State) => state.treatmentLab);

  const { setShowEditTLabModal, setShowDeleteTLabModal, setSelectedTreatLab } =
    useContext(ShowTreatLabContext);

  const { labId } = useParams();

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchLab = async () => {
      try {
        await dispatch(ShowTreatmentLabApi(labId || ""));
      } catch {}
    };
    fetchLab();
  }, [dispatch, labId]);

  useEffect(() => {
    const fetchTreatment = async () => {
      await dispatch(ShowTreatmentApi());
    };
    fetchTreatment();
  }, [dispatch]);

  const toggleEditUser = (treatment: TreatmentLabInterface) => {
    setShowEditTLabModal(true);
    setSelectedTreatLab(treatment);
  };

  const toggleDeleteUser = (treatment: TreatmentLabInterface) => {
    setShowDeleteTLabModal(true);
    setSelectedTreatLab(treatment);
  };

  return (
    <div className="">
      <div className="flex flex-col border">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-3 py-2 border-r">Traitement</th>
                    <th className="px-3 py-2 border-r">Prix</th>
                    <th className="px-3 py-2 border-r">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentLab
                    ?.slice()
                    .sort(
                      (a: TreatmentLabInterface, b: TreatmentLabInterface) =>
                        a.treatment.name.localeCompare(b.treatment.name)
                    )
                    .map((treatment: TreatmentLabInterface, index: number) => (
                      <tr className="border-b" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium text-start">
                          {treatment.treatment?.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {treatment.price}
                        </td>
                        <td className="bg-white h-full">
                          <div className="flex justify-center">
                            <FaEdit
                              className="text-blue"
                              style={{
                                fontSize: "22px",
                              }}
                              onClick={() => toggleEditUser(treatment)}
                            />
                            <MdRemoveCircle
                              className="text-red"
                              style={{
                                fontSize: "22px",
                              }}
                              onClick={() => toggleDeleteUser(treatment)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLabTreats;
