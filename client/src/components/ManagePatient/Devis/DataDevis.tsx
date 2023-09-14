import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ShowDevisApi } from "../../../redux/devis/devisApiCalls";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useParams } from "react-router";
import { DefaultDevisInterface, DevisInterface, LineDevisType, ShowDevisInterfaceContext } from "./types";
import HeaderInvoice from "../HeaderInvoice";
import { DefaultPatientInterface, PatientInterface } from "../../patients/types";

const DataDevis: React.FC = () => {
  const { devis } = useSelector((state: State) => state.devis);
  const { patientId } = useParams()
  const { patients } = useSelector((state: State) => state.patients)

  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchDevis = async () => {
      dispatch(ShowDevisApi(patientId));
    };
    fetchDevis();
  }, [dispatch, patientId]);

  const { selectedDevis, setSelectedDevis } = useContext(ShowDevisInterfaceContext)

  useEffect(() => {
    const SDevis: DevisInterface = devis.find((dv: any) => dv._id === selectedDevis?._id) || DefaultDevisInterface
    setSelectedDevis(SDevis.numDevis ? SDevis : devis[0])
  }, [devis, setSelectedDevis, selectedDevis])

  const [totalDevis, setTotalDevis] = useState(0)
  useEffect(() => {
    setTotalDevis(selectedDevis
      ?.LineDevis
      .reduce((acc: any, currVal: LineDevisType) => (currVal.price * currVal.teeth.nums.length) + acc, 0))
  }, [selectedDevis])


  return (
    <>
    {selectedDevis  &&
      <div className="flex flex-col col-start-2 col-span-4 print:w-full">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden invoice">
            <HeaderInvoice type={`Devis N-${selectedDevis.numDevis}`} PatientInfo={patients.find((patient: PatientInterface) => patient._id === patientId) ?? DefaultPatientInterface}/>            
            <table className="min-w-full text-left text-sm font-light text-center">
              <thead className="border font-medium bg-white text-black border-gray-950">
                <tr>
                  <th className="px-3 py-2 border-r border-gray-950">Traitment</th>
                  <th className="px-3 py-2 border-r border-gray-950">Dents</th>
                  <th className="px-3 py-2 border-r border-gray-950">Surface</th>
                  <th className="px-3 py-2 border-r border-gray-950">NBS</th>
                  <th className="px-3 py-2 border-r border-gray-950">Prix.U</th>
                  <th className="px-3 py-2 border-r border-gray-950">total</th>
                </tr>
              </thead>
              <tbody>
                {selectedDevis?.LineDevis?.map((lnDevis: LineDevisType, index) => (
                  <tr className="border-b border-l border-gray-950" key={index}>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white text-start font-medium border-gray-950">
                      {lnDevis.treatment?.name}
                    </td>
                    <td className="px-3 py-2 border-r bg-white font-medium border-gray-950 whitespace-normal w-36"> {/* style={{ maxWidth: "150px",  whiteSpace: "normal" }}  */}
                      {lnDevis.teeth.nums.map((num: string, index) => num + (index < lnDevis.teeth.nums.length - 1 ? ", " : ""))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium border-gray-950">
                      {lnDevis.teeth.surface}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium border-gray-950">
                      {lnDevis.teeth.nums.length}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium border-gray-950">
                      {lnDevis.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium border-gray-950">
                      {lnDevis.price * lnDevis.teeth.nums.length}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-end">
                  <td colSpan={4}></td>
                  <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">Total: </td>
                  <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">
                    {totalDevis}
                  </td>
                </tr>
                {selectedDevis.reduce > 0 && 
                <>
                  <tr className="text-end">
                    <td colSpan={4}></td>
                    <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">reduction: </td>
                    <td className="whitespace-nowrap px-3 py-2 bg-white font-bold border border-gray-950">
                      {selectedDevis.reduce}%
                    </td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan={4}></td>
                    <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">Reste: </td>
                    <td className="whitespace-nowrap px-3 py-2 bg-white font-medium border border-gray-950">
                      {totalDevis - (totalDevis * (selectedDevis.reduce / 100))}
                    </td>
                  </tr>                
                </>
                }
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
      }
    </>

  );
};

export default DataDevis;
