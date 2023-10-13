import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { MyConsumptionsInterface, ShowMyConsumptionContext } from "./types";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { useParams } from "react-router";
import { ShowConsumableContext } from "../types";
import { filterSpecificDate } from "../../../functions/functions";
import { useTranslation } from "react-i18next";

const DataConsumptions: React.FC = () => {
  const { consumptions } = useSelector((state: State) => state.consumptions);
  const { doctorId } = useParams()
  
  const { 
    showEditConsumption, setShowEditConsumption,
    setSelectedConsumption,
    showDeleteConsumption, setShowDeleteConsumption } = useContext(ShowMyConsumptionContext)

  const handleShowEditConsumption = (consumption: MyConsumptionsInterface) => {
    setShowEditConsumption(!showEditConsumption)
    setSelectedConsumption(consumption)
  }

  const handleShowDeleteConsumption = (consumption: MyConsumptionsInterface) => {
    setShowDeleteConsumption(!showDeleteConsumption)
    setSelectedConsumption(consumption)
  }

  const { showSwitchDate, startDate, endDate, selectedDate, month, day } = useContext(ShowConsumableContext)

  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8 invoice">
            <div className={`overflow-hidden invoice`}>
              <table className="min-w-full text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-6 py-4 border-r">{t("Note")}</th>
                    <th className="px-6 py-4 border-r">{t("Montant")}</th>
                    <th className="px-6 py-4 border-r print:hidden">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  filterSpecificDate(
                    consumptions, day, month, showSwitchDate, startDate, endDate, selectedDate
                  )
                  .filter((consumption: MyConsumptionsInterface) => consumption.doctor._id === doctorId)
                  .map(
                    (consumption: MyConsumptionsInterface, index) => (
                      <tr className="border-b" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {consumption.note}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {consumption.amount}
                        </td>
                        <td className="bg-white print:hidden">
                          <div className="flex justify-center items-center">
                            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => handleShowEditConsumption(consumption)} />
                            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => handleShowDeleteConsumption(consumption)} />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                  <tr>
                    <td></td>
                    <td className="whitespace-nowrap px-4 py-2 bg-white font-medium">
                      {filterSpecificDate(
                        consumptions, day, month, showSwitchDate, startDate, endDate, selectedDate
                      )
                      .filter((consumption: MyConsumptionsInterface) => consumption.doctor._id === doctorId)
                      .reduce((acc, currVal) => acc + (Number(currVal.amount) ?? 0), 0)
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataConsumptions;
