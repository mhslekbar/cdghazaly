import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { State } from "../../redux/store";
import { PrescriptionInterface, ShowPrescriptionContext } from "./types";


const DataPrescription: React.FC = () => {
  const { prescriptions } = useSelector((state: State) => state.prescriptions);
  
  const { 
    showEditPrescription, setShowEditPrescription,
    setSelectedPrescription,
    showDeletePrescription, setShowDeletePrescription, } = useContext(ShowPrescriptionContext)

  const handleShowEditConsumption = (Prescription: PrescriptionInterface) => {
    setShowEditPrescription(!showEditPrescription)
    setSelectedPrescription(Prescription)
  }

  const handleShowDeleteConsumption = (Prescription: PrescriptionInterface) => {
    setShowDeletePrescription(!showDeletePrescription)
    setSelectedPrescription(Prescription)
  }

  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className={`overflow-hidden invoice`}>
              <table className="min-w-full text-sm font-light text-center border border-black">
                <thead className="border-b font-medium bg-main text-white border-black">
                  <tr>
                    <th className="px-4 py-4 border-r border-black">{t("No")}</th>
                    <th className="px-4 py-4 border-r border-black">{t("Nom")}</th>
                    <th className="px-4 py-4 border-r border-black">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions
                  .slice()
                  .map(
                    (Prescription: PrescriptionInterface, index) => (
                      <tr className="border-b border-black" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r border-black bg-white font-medium">
                          {`ord-` + (prescriptions.length - index)}
                        </td>
                        <td className="text-start whitespace-pre-wrap px-4 py-2 border-r border-black bg-white font-medium">
                          {Prescription.content}
                        </td>
                        <td className="bg-white">
                          <div className="flex justify-center items-center">
                            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => handleShowEditConsumption(Prescription)} />
                            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => handleShowDeleteConsumption(Prescription)} />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPrescription;
