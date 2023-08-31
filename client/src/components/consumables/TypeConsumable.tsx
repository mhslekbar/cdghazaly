import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet, useLocation } from 'react-router'
import { State } from '../../redux/store'
import { PermissionType } from '../roles/types'

const TypeConsumable:React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { permissions } =useSelector((state: State) => state.permissions)

  return (
    <>
      <section className="grid xs:grid-cols-1 md:grid-cols-4 gap-2 mt-3">
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "BON_COMMANDE"
      ) && (
        <div className={`${location.pathname.split("/")[3] === "purchase-order" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("purchase-order")} >
          Bon de commande
        </div>
      )}
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "CONSOMMATIONS"
      ) && (
        <div className={`${location.pathname.split("/")[3] === "consumptions" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("consumptions")} >
          Consommations
        </div>
      )}
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "LIST_CONSOMMABLE"
      ) && (
        <div className={`${location.pathname.split("/")[3] === "consumable_list" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("consumable_list")} >
          List Consommable
        </div>
      )}
      {permissions.find(
        (permission: PermissionType) =>
          permission.name === "AFFICHER" &&
          permission.collectionName === "FOURNISSEURS"
      ) && (
        <div className={`${location.pathname.split("/")[3] === "suppliers" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("suppliers")} >
          Fournisseurs
        </div>
      )}
    </section>
    <Outlet />
    </>
  )
}

export default TypeConsumable
