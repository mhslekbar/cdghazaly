import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { ShowTreatmentContext } from "./ShowTreatAssurance";
import { TreatmentType } from "./types";
import { State } from "../../../redux/store";
import { useParams } from "react-router";

const TreatmentTable:React.FC = () => {
  const { treatments } = useSelector((state: State) => state.treatments);
  const { setShowEditTreat, setShowDeleteTreat, setSelectedTreat } = useContext(ShowTreatmentContext)

  const toggleEditTreat = (treatment: TreatmentType) => {
    setShowEditTreat(true)
    setSelectedTreat(treatment)
  }
  const toggleDeleteTreat = (treatment: TreatmentType) => {
    setShowDeleteTreat(true)
    setSelectedTreat(treatment)
  }

  const { AssId } = useParams()

  return (
    <div className="flex flex-col border mt-2">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-main text-white text-center">
                <tr>
                  <th className="px-6 py-3 border-r">Nom</th>
                  <th className="px-6 py-3 border-r">Price</th>
                  <th className="px-6 py-3 border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                {treatments
                  .slice()
                  .filter((treat: TreatmentType) => treat.assurance?._id === AssId)
                  .sort((a: TreatmentType, b: TreatmentType) => a.name.localeCompare(b.name))
                  .map((treatment: TreatmentType, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {treatment.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {treatment.price}
                    </td>
                    <td className="bg-white h-full">
                      <div className="flex justify-center">
                        <FaEdit className="text-blue" style={{
                          fontSize: "22px"
                        }} 
                        onClick={() => toggleEditTreat(treatment)}
                        />
                        <MdRemoveCircle className="text-red" style={{
                          fontSize: "22px"
                        }}
                        onClick={() => toggleDeleteTreat(treatment)}
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
  );
};

export default TreatmentTable;
