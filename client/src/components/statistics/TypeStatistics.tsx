import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import { ShowPaymentsApi } from "../../redux/payments/paymentApiCalls";
import FilterStatistics from "./FilterStatistics";
import { useTranslation } from "react-i18next";

const TypeStatistics: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch: any =  useDispatch()

  useEffect(() => {
    const fetchPayments = async () => {
      await dispatch (ShowPaymentsApi())
    }
    fetchPayments()
  }, [dispatch, location])

  const { t } = useTranslation()

  return (
    <>
    <section className="grid xs:grid-cols-1 md:grid-cols-4 gap-2 mt-3">
      <div className={`${location.pathname.split("/")[3] === "payments" ? "bg-main" : ""} px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("payments")}>
        {t("Versement")}
      </div>
      <div className={`${location.pathname.split("/")[3] === "accounting" ? "bg-main" : ""}   px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("accounting")}>
        {t("Comptabilité")}
      </div>
      <div className={`${location.pathname.split("/")[3] === "treatments" ? "bg-main" : ""}   px-6 py-4 bg-white rounded-4 shadow border hover:bg-main flex justify-center items-center h-24`} onClick={() => navigate("treatments")}>
        {t("Traitements")}
      </div>
    </section>
    <FilterStatistics />
    <Outlet />
    </>
  );
};

export default TypeStatistics;
