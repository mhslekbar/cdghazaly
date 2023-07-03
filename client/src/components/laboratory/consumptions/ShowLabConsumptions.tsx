import React, { useContext, useEffect, useState } from "react";
import { ShowLaboratoryContext } from "../ShowLaboratory";
import { useParams } from "react-router";
import { post } from "../../../requestMethods";
import { DefaultLaboratoryInterface, laboratoryInterface } from "../types";
import { LabConsumptionInterface } from "./types";

const ShowLabConsumptions = () => {
  const { selectedDoctorLab } = useContext(ShowLaboratoryContext);
  const [foundLaboratory, setFoundLaboratory] = useState<laboratoryInterface>(
    DefaultLaboratoryInterface
  );

  const { labId, doctorId } = useParams();
  useEffect(() => {
    const fetchLabs = async () => {
      const response = await post(`laboratory/consumptions`, { labId });
      setFoundLaboratory(response.data.success);
    };
    fetchLabs();
  }, [labId]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-gray-700 mt-2">
        {selectedDoctorLab.username}
      </h1>
      <div className="flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-6 py-4 border-r">Patient</th>
                    <th className="px-6 py-4 border-r">Traitement</th>
                    <th className="px-6 py-4 border-r">Dents</th>
                    <th className="px-6 py-4 border-r">Prix du lab</th>
                    <th className="px-6 py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {foundLaboratory?.consumptions
                    ?.filter(
                      (consumption: LabConsumptionInterface) => consumption.doctor._id === doctorId
                    )
                    .sort((a: LabConsumptionInterface, b: LabConsumptionInterface) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    ?.map((consumption: LabConsumptionInterface, index) => (
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

export default ShowLabConsumptions;
