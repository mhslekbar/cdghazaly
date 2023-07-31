import React, { useContext } from "react";
import { UserInterface } from "./types";
import { PermissionType } from "../roles/types";
import { FaEdit } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { ShowUserContext } from "./ShowUsers";

interface TableUsersInterface {
  users: UserInterface[];
}

const TableUsers: React.FC<TableUsersInterface> = ({ users }) => {
  const { showEditModal, setShowEditModal, setSelectedUser, setShowDeleteModal } = useContext(ShowUserContext)
  
  const toggleEditUser = (user: UserInterface) => {
    setShowEditModal(!showEditModal)
    setSelectedUser(user)
  }

  const toggleDeleteUser = (user: UserInterface) => {
    setShowDeleteModal(!showEditModal)
    setSelectedUser(user)
  }

  return (
    <div className="flex flex-col border mt-2 shadow">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b border-white font-medium bg-main text-white text-center">
                <tr>
                  <th className="px-6 py-4 border-r">Nom</th>
                  <th className="px-6 py-4 border-r">phone</th>
                  <th className="px-6 py-4 border-r">roles</th>
                  <th className="px-6 py-4 border-r">cabinet</th>
                  <th className="px-6 py-4 border-r">pourcentage</th>
                  <th className="px-6 py-4 border-r">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                ?.filter((user: UserInterface) => !user.dev)
                ?.map((user: UserInterface, index) => (
                  <tr className="border-b " key={index}>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.roles.map((role:PermissionType, index) => `${role.name}${user.roles.length > 1 && user.roles.length - 1 > index  ? ", " : ""}`)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.doctor?.cabinet}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border-r bg-white font-medium">
                      {user.doctor?.percentage}
                    </td>
                    <td className="bg-white h-full">
                      <div className="flex justify-center">
                        <FaEdit className="text-blue" style={{
                          fontSize: "22px"
                        }} 
                        onClick={() => toggleEditUser(user)}
                        />
                        <MdRemoveCircle className="text-red" style={{
                          fontSize: "22px"
                        }}
                        onClick={() => toggleDeleteUser(user)}
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

export default TableUsers;
