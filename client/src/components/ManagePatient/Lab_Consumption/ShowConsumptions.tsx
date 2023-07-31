import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ShowConsumptionLabApi } from "../../../redux/laboratory/consumptions/consumptionLabApiCalls";

const ShowConsumptions: React.FC = () => {
  const { consumptionLab } = useSelector(
    (state: State) => state.consumptionLab
  );

  const dispatch: any = useDispatch();
  const { patientId } = useParams();

  useEffect(() => {
    const fetchLab = async () => {
      await dispatch(ShowConsumptionLabApi({ patient: patientId }));
    };
    fetchLab();
  }, [dispatch, patientId]);

  return (
    <div className="flex flex-col border mt-3 shadow">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border-b font-medium bg-main text-white">
                <tr>
                  <th className="px-6 py-4 border-r">Traitement</th>
                  <th className="px-6 py-4 border-r">Dents</th>
                  <th className="px-6 py-4 border-r">NBS.SN</th>
                  <th className="px-6 py-4 border-r">Prix</th>
                  <th className="px-6 py-4 border-r">Total</th>
                  <th className="px-6 py-4">Laboratoire</th>
                </tr>
              </thead>
              <tbody>
                {consumptionLab?.map((labo: any) =>
                  labo.consumptions
                  ?.filter((consumption: any) => consumption.patient._id === patientId)
                  ?.map((consumption: any, index: number) => (
                    <tr className="border-b" key={index}>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {consumption.treatment.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {consumption.teeth.nums.map(
                          (num: string, ind: number) =>
                            num +
                            (ind < consumption.teeth.nums.length - 1
                              ? ", "
                              : "")
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {consumption.teeth.nums.length}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {consumption.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {consumption.teeth.nums.length * consumption.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                        {labo.name}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowConsumptions;
