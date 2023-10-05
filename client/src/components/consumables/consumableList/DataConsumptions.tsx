import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { ListConsumableInterface, ShowConsumableListContext } from "./types";
import { State } from "../../../redux/store";


const DataConsumableList: React.FC = () => {
  const { ListConsumable } = useSelector((state: State) => state.ListConsumable);
  
  const { 
    showEditListConsumable, setShowEditListConsumable,
    setSelectedListConsumable,
    showDeleteListConsumable, setShowDeleteListConsumable, } = useContext(ShowConsumableListContext)

  const handleShowEditConsumption = (ConsumableList: ListConsumableInterface) => {
    setShowEditListConsumable(!showEditListConsumable)
    setSelectedListConsumable(ConsumableList)
  }

  const handleShowDeleteConsumption = (ConsumableList: ListConsumableInterface) => {
    setShowDeleteListConsumable(!showDeleteListConsumable)
    setSelectedListConsumable(ConsumableList)
  }


  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex flex-col border mt-3">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full sm:px-6 lg:px-8">
            <div className={`overflow-hidden invoice`}>
              <table className="min-w-full text-left text-sm font-light text-center">
                <thead className="border-b font-medium bg-main text-white">
                  <tr>
                    <th className="px-6 py-4 border-r">Name</th>
                    <th className="px-6 py-4 border-r">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ListConsumable
                  .slice()
                  .sort((a: ListConsumableInterface, b: ListConsumableInterface) => a.name.localeCompare(b.name))
                  .map(
                    (ConsumableList: ListConsumableInterface, index) => (
                      <tr className="border-b" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                          {ConsumableList.name}
                        </td>
                        <td className="bg-white">
                          <div className="flex justify-center items-center">
                            <FaEdit className="text-blue" style={{ fontSize: "22px" }} onClick={() => handleShowEditConsumption(ConsumableList)} />
                            <MdRemoveCircle className="text-red" style={{ fontSize: "22px" }} onClick={() => handleShowDeleteConsumption(ConsumableList)} />
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

export default DataConsumableList;
