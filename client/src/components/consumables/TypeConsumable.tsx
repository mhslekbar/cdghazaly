import React from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router'

const TypeConsumable:React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <section className="grid grid-cols-4 gap-2 mt-3">
      <div className={`${location.pathname.split("/")[3] === "purhcase-order" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("purhcase-order")} >
        Bon de commande
      </div>
      <div className={`${location.pathname.split("/")[3] === "consumptions" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("consumptions")} >
        Consommations
      </div>
      <div className={`${location.pathname.split("/")[3] === "consumable_list" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("consumable_list")} >
        List Consommable
      </div>
    </section>
    <Outlet />
    </>
  )
}

export default TypeConsumable
