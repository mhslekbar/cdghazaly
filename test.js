import React, { useContext } from "react";
import { SelectElement } from "../../HtmlComponents/SelectElement";
import { Days, Months, ShowStatisticContext, Years } from "./types";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { InputElement } from "../../HtmlComponents/InputElement";
import { formattedDate } from "../../functions/functions";
import { FaPrint } from "react-icons/fa";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const FilterStatistics: React.FC = () => {
  const {
    day,
    setDay,
    month,
    setMonth,
    year,
    setYears,
    showSwitchDate,
    setShowSwitchDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(ShowStatisticContext);
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <div className="flex justify-start gap-2 mt-3">
      
      {showSwitchDate && location.pathname.split("/")[3] !== "treatments" ? (
        <>
          <BiChevronUpCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name="Debut" value={formattedDate(startDate.toString())} setValue={setStartDate} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name="Fin" value={formattedDate(endDate.toString())} setValue={setEndDate} />
        </>
      ) : location.pathname.split("/")[3] !== "treatments"  && (
        <>
          <>
            <BiChevronDownCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
            <span className="my-2 px-1 pt-1 bg-main rounded" onClick={() => {
              setDay(new Date().getDate())
              setMonth(new Date().getMonth() + 1)
              setYears(new Date().getFullYear())
            }}>{t("Aujourd'hui")}</span>
            <span className="my-2 px-1 pt-1 bg-main rounded" onClick={() => {
              setDay(0)
              setMonth(new Date().getMonth() + 1)
              setYears(new Date().getFullYear())
            }}>{t("Ce mois")}</span>
            <SelectElement valueType="string" value={day} setValue={setDay} defaultOption={<option value={"jour"}>{t("jour")}</option>} options={Days} />
            <SelectElement valueType="string" value={month} setValue={setMonth} defaultOption={<option value={"mois"}>{t("mois")}</option>} options={Months} />
            <SelectElement valueType="string" value={year} setValue={setYears} options={Years} />
          </>
          <>
          <span className="my-2 px-1 pt-1 bg-main rounded" onClick={() => {
              setDay(new Date().getDate())
              setMonth(new Date().getMonth() + 1)
              setYears(new Date().getFullYear())
            }}>{t("Matin")}</span>
            <span className="my-2 px-1 pt-1 bg-main rounded" onClick={() => {
              setDay(new Date().getDate())
              setMonth(new Date().getMonth() + 1)
              setYears(new Date().getFullYear())
            }}>{t("Soir")}</span>
          </>
        </>
      )}
      <FaPrint onClick={() => window.print()} className="text-blue" style={{ fontSize: "22px" }} />
    </div>
  );
};

export default FilterStatistics;
