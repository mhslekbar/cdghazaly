import React, { useContext, useEffect, useState } from "react";
import { ShowLaboratoryContext } from "../ShowLaboratory";
import { useParams } from "react-router";
import { LabConsumptionInterface } from "./types";
import { useDispatch } from "react-redux";
import { ShowConsumptionLabApi } from "../../../redux/laboratory/consumptions/consumptionLabApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";

const ShowLabConsumptions:React.FC = () => {
  const { selectedDoctorLab } = useContext(ShowLaboratoryContext);
  const { consumptionLab } = useSelector((state: State) => state.consumptionLab)

  const { labId, doctorId } = useParams();
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchLabs = async () => {
       await dispatch(ShowConsumptionLabApi({labId}))
    };
    fetchLabs();
  }, [dispatch, labId]);

  const [totalConsumption, setTotalConsumption] = useState<number>(0)

  useEffect(() => {
    setTotalConsumption(
      consumptionLab
      ?.filter(
        (consumption: LabConsumptionInterface) => consumption.doctor?._id === doctorId
      )
      ?.sort((a: LabConsumptionInterface, b: LabConsumptionInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      ?.reduce((acc, currVal: LabConsumptionInterface) => (currVal.price * currVal.teeth.nums.length) + acc, 0)

    )   
  }, [consumptionLab, doctorId])

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-gray-700 mt-2">
        {selectedDoctorLab.username}
      </h1>
      <div className="flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-3 py-2 border-r">Patient</th>
                    <th className="px-3 py-2 border-r">Traitement</th>
                    <th className="px-3 py-2 border-r">Dents</th>
                    <th className="px-3 py-2 border-r">Prix du lab</th>
                    <th className="px-3 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {consumptionLab
                    ?.filter(
                      (consumption: LabConsumptionInterface) => consumption.doctor?._id === doctorId
                    )
                    ?.sort((a: LabConsumptionInterface, b: LabConsumptionInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    ?.map((consumption: LabConsumptionInterface, index) => {
                      // setTotalConsumption((prevAmount) => prevAmount + (consumption.price * consumption.teeth.nums.length))
                      return (
                        <tr className="border-b" key={index}>
                          <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                            {consumption.patient.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                            {consumption.treatment.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                            {consumption.teeth.nums.map((num: string, ind: number) => num + (ind < consumption.teeth.nums.length - 1 ? ", " : ""))}                    
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                            {consumption.price}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                            {consumption.price * consumption.teeth.nums.length}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
                <tr className="border-b">
                  <td colSpan={3}></td>
                  <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">Total</td>
                  <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">{totalConsumption}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowLabConsumptions;
