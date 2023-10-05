import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { ShowSuppliersContext, SupplierInterface, accountSupplierInterface } from "./types";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router";

const DataSuppliers: React.FC = () => {
  const { suppliers } = useSelector((state: State) => state.suppliers);
  const { doctorId } = useParams()
  const { 
    showEditSupplier, setShowEditSupplier,
    setSelectedSupplier,
    showDeleteSupplier, setShowDeleteSupplier } = useContext(ShowSuppliersContext)

  const handleShowEditSupplier = (supplier: SupplierInterface) => {
    setShowEditSupplier(!showEditSupplier)
    setSelectedSupplier(supplier)
  }

  const handleShowDeleteSupplier = (supplier: SupplierInterface) => {
    setShowDeleteSupplier(!showDeleteSupplier)
    setSelectedSupplier(supplier)
  }

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className={`overflow-hidden invoice}`}>
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-6 py-4 border-r">Nom</th>
                    <th className="px-6 py-4 border-r">Telephone</th>
                    <th className="px-6 py-4 border-r">Balance</th>
                    <th className="px-6 py-4 border-r print:hidden">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  suppliers
                  .map(
                    (supplier: SupplierInterface, index) => (
                      <tr className="border-b" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium hover:bg-[#EEE]" onClick={() => navigate(`${supplier._id}`)}>
                          {supplier.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {supplier.phone}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {supplier.accounts.find((comp: accountSupplierInterface) => comp.doctor._id === doctorId)?.balance}
                        </td>
                        <td className="bg-white print:hidden">
                          <div className="flex justify-center items-center">
                            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => handleShowEditSupplier(supplier)} />
                            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => handleShowDeleteSupplier(supplier)} />
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

export default DataSuppliers;

