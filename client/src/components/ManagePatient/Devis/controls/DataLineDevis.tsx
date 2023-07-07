import React, { useContext } from "react";
import { DataDevisContext, EnumTypeModal, EnumTypeTeethBoard, LineDevisType, ShowDevisInterfaceContext } from "../types";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteLineDevisApi } from "../../../../redux/devis/devisApiCalls";
import { useParams } from "react-router";

interface DataLineDevisInterface {
  LineDevis: LineDevisType[],
  setLineDevis: (LineDevis: LineDevisType[]) => void
}

const DataLineDevis: React.FC<DataLineDevisInterface> = ({ LineDevis, setLineDevis }) => {
  const { showTeethBoard, setShowTeethBoard, selectedDevis } = useContext(ShowDevisInterfaceContext)
  const { setTeethBoardData, setTypeTeethBoard, TypeModal }  = useContext(DataDevisContext)
  const dispatch: any = useDispatch()

  const { patientId } = useParams()

  const toggleDeleteLnDevis = async (lnDevis: LineDevisType) => {
    if(TypeModal === EnumTypeModal.EDIT_DEVIS_MODAL) {
      await dispatch(deleteLineDevisApi(patientId, selectedDevis._id, lnDevis._id))
    } else {
      setLineDevis(LineDevis.filter((ln: LineDevisType) => ln.treatment._id !== lnDevis.treatment._id))
    }
  }

  const toggleEditLnDevis = (lnDevis: LineDevisType) => {
    setShowTeethBoard(!showTeethBoard)
    setTeethBoardData(lnDevis)
    setTypeTeethBoard(EnumTypeTeethBoard.EDIT_NEW_TEETH)
  }

  return (
    <div className="flex flex-col border col-start-2 col-span-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium bg-main text-white text-center">
                <tr>
                  <th className="px-3 py-2 border-r">Traitment</th>
                  <th className="px-3 py-2 border-r">Dents</th>
                  <th className="px-3 py-2 border-r">Surface</th>
                  <th className="px-3 py-2 border-r">NBS</th>
                  <th className="px-3 py-2 border-r">Price</th>
                  <th className="px-3 py-2 border-r">total</th>
                  <th className="px-3 py-2 border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                {LineDevis.map((lnDevis: LineDevisType, index) => (
                  <tr className="border-b" key={index}>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.treatment?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.nums.map((num: string, ind) => num + (ind < lnDevis.teeth.nums.length - 1 ? ", " : ""))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.surface}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.teeth.nums.length}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.price}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 border-r bg-white font-medium">
                      {lnDevis.price * lnDevis.teeth.nums.length}
                    </td>
                    <td className="bg-white h-full">
                      <div className="flex justify-center">
                        <FaEdit className="text-blue" style={{
                          fontSize: "22px"
                        }} 
                        onClick={() => toggleEditLnDevis(lnDevis)}
                        />
                        <MdRemoveCircle className="text-red" style={{
                          fontSize: "22px"
                        }}
                        onClick={() => toggleDeleteLnDevis(lnDevis)}
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

export default DataLineDevis;
