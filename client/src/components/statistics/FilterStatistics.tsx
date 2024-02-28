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
    // partOfDay, setPartOfDay,
  } = useContext(ShowStatisticContext);
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <>
      {location.pathname.split("/")[3] !== "treatments" && <div> 
      {showSwitchDate ? (
        <div className="xs:grid xs:grid-cols-3 md:flex md:justify-start gap-2 mt-3">
          <BiChevronUpCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name={t("Debut")} value={formattedDate(startDate.toString())} setValue={setStartDate} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name={t("Fin")} value={formattedDate(endDate.toString())} setValue={setEndDate} />
        </div>
      ) : (
        <>
        <div className="xs:grid xs:grid-cols-5 md:flex md:justify-start gap-2 mt-3">
          <BiChevronDownCircle className="text-main xs:mb-1 md:mb-0" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <span className="my-4 px-1 pt-1 bg-main rounded mr-2" onClick={() => {
            setDay(new Date().getDate().toString())
            setMonth(new Date().getMonth() + 1)
            setYears(new Date().getFullYear())
          }}>{t("Aujourd'hui")}</span>
          <span className="my-4 px-1 pt-1 bg-main rounded" onClick={() => {
            setDay('jour')
            setMonth(new Date().getMonth() + 1)
            setYears(new Date().getFullYear())
          }}>{t("Ce mois")}</span>
          <SelectElement valueType="string" value={day} setValue={setDay} defaultOption={<option value={"jour"}>{t("jour")}</option>} options={Days} />
          <SelectElement valueType="string" value={month} setValue={setMonth} defaultOption={<option value={"mois"}>{t("mois")}</option>} options={Months} />
          <SelectElement valueType="string" value={year} setValue={setYears} options={Years} />
        </div>
        {/* <span className={`my-4 px-1 pt-1 ${partOfDay === "matin" ? "bg-main" : ""} rounded mr-2`} onClick={() => {
          setPartOfDay("matin")
        }}>{t("Matin")}</span>
        <span className={`my-4 px-1 pt-1 ${partOfDay === "soir" ? "bg-main" : ""} rounded`} onClick={() => {
          setPartOfDay("soir")
        }}>{t("Soir")}</span> */}
      </>
      )}
    </div>}
    <FaPrint onClick={() => window.print()} className="text-blue" style={{ fontSize: "22px" }} />
    </>
  );
};

export default FilterStatistics;
