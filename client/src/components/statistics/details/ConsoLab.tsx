import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowConsumptionLabApi } from "../../../redux/laboratory/consumptions/consumptionLabApiCalls";
import { filterSpecificDate } from "../../../functions/functions";
import { useParams } from "react-router";
import { LabConsumptionInterface } from "../../laboratory/consumptions/types";
import { ShowStatisticContext } from "../types";

const ConsoLab: React.FC = () => {
  const { consumptionLab } = useSelector(
    (state: State) => state.consumptionLab
  );
  const dispatch: any = useDispatch();
  useEffect(() => {
    const fetchConsumptions = async () => {
      await dispatch(ShowConsumptionLabApi());
    };
    fetchConsumptions();
  }, [dispatch]);

  const { doctorId } = useParams()
  const { day, month, selectedDate, showSwitchDate, startDate, endDate, setSumConsoLab, sumConsoLab } = useContext(ShowStatisticContext)

  useEffect(() => {
    setSumConsoLab(consumptionLab        
      ?.reduce(
        (accF: any, currValF: any) =>
          accF +
          filterSpecificDate(
            currValF.consumptions, day, month, showSwitchDate, startDate, endDate, selectedDate
          )
          ?.filter(
            (consolab: LabConsumptionInterface) => 
            consolab.doctor._id === doctorId
          )
          ?.reduce(
            (acc: any, currVal: any) => acc + currVal.teeth.nums.length * currVal.price, 0
          ),
        0
      ))
    }, [day, month, selectedDate, showSwitchDate, startDate, endDate, setSumConsoLab, sumConsoLab, doctorId, consumptionLab])

  return (
    <tr>
      <td colSpan={2}></td>
      <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
        Lab
      </td>
      <td className="whitespace-nowrap px-4 py-2 bg-white font-medium border border-gray-950">
        {sumConsoLab}
      </td>
    </tr>
  );
};

export default ConsoLab;

// .filter((consolab: LabConsumptionInterface) => {
//   const ConsoLabDate = new Date(consolab.createdAt);
//   if(showSwitchDate) {
//     return ConsoLabDate >= startDate && ConsoLabDate <= endDate;
//   } else {
//     if (day.toString() === "jour" && month.toString() !== "mois") {
//       const startDate = new Date(selectedDate);
//       startDate.setDate(1);
//       const endDate = new Date(selectedDate);
//       endDate.setDate(31);
//       return ConsoLabDate >= startDate && ConsoLabDate <= endDate;
//     }
//     if (month.toString() === "mois") {
//       const startDate = new Date(selectedDate);
//       startDate.setDate(1);
//       startDate.setMonth(0);
//       const endDate = new Date(selectedDate);
//       endDate.setDate(31);
//       endDate.setMonth(11);          
//       return ConsoLabDate >= startDate && ConsoLabDate <= endDate;
//     }
//     const selectedDateFormatted = formatDate(selectedDate.toString());
//     const ConsoLabDateFormatted = formatDate(ConsoLabDate.toString());

//     return ConsoLabDateFormatted === selectedDateFormatted;
//   }
// })