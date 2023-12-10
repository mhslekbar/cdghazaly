import React, { useContext } from "react";
import { SelectElement } from "../../HtmlComponents/SelectElement";
import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { InputElement } from "../../HtmlComponents/InputElement";
import { formattedDate } from "../../functions/functions";
import { Days, Months, Years } from "../statistics/types";
import { ShowConsumableContext } from "./types";
import { FaPrint } from "react-icons/fa";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";

const FilterConsumable: React.FC = () => {
  const {
    day, setDay,
    month, setMonth,
    year, setYear,
    showSwitchDate, setShowSwitchDate,
    startDate, setStartDate,
    endDate, setEndDate, contentToPrint
  } = useContext(ShowConsumableContext);

  const location = useLocation()
  const { t } = useTranslation()

  const printDocument = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: t("Facture"),
  })


  return (
    <div className="flex justify-start gap-2 mt-3">
      {showSwitchDate ? (
        <div className="xs:grid xs:grid-cols-3 md:flex md:justify-start gap-2 mt-3">
          <BiChevronUpCircle className="text-main" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name={t("Debut")} value={formattedDate(startDate.toString())} setValue={setStartDate} />
          <InputElement divClass="flex justify-center items-center gap-1" type="date" name={t("Fin")} value={formattedDate(endDate.toString())} setValue={setEndDate} />
        </div>
      ) : (
        <div className="xs:grid xs:grid-cols-5 md:flex md:justify-start gap-2 mt-3">
          <BiChevronDownCircle className="text-main xs:mb-1 md:mb-0" style={{ fontSize: "22px" }} onClick={() => setShowSwitchDate(!showSwitchDate)} />
          <span className="my-2 px-1 pt-1 bg-main rounded mr-2" onClick={() => {
            setDay(new Date().getDate())
            setMonth(new Date().getMonth() + 1)
            setYear(new Date().getFullYear())
          }}>{t("Aujourd'hui")}</span>
          <span className="my-2 px-1 pt-1 bg-main rounded mr-2" onClick={() => {
            setDay(0)
            setMonth(new Date().getMonth() + 1)
            setYear(new Date().getFullYear())
          }}>{t("Ce mois")}</span>          
          <SelectElement valueType="string" value={day} setValue={setDay} defaultOption={<option value={"jour"}>{t("jour")}</option>} options={Days} />
          <SelectElement valueType="string" value={month} setValue={setMonth} defaultOption={<option value={"mois"}>{t("mois")}</option>} options={Months} />
          <SelectElement valueType="string" value={year} setValue={setYear} options={Years} />
        </div>
      )}
      {location.pathname.split("/")[3] !== "purchase-order" && 
        <FaPrint onClick={printDocument} className="text-blue" style={{ fontSize: "22px" }} />
      }
    </div>
  );
};

export default FilterConsumable;
