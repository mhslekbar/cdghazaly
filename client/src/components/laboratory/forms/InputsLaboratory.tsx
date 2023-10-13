import React, { useContext } from "react";
import { DataLaboratoryContext } from "../types";
import { useTranslation } from "react-i18next";

const InputsLaboratory: React.FC = () => {
  const { name, setName, phone, setPhone } = useContext(DataLaboratoryContext);
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="Nom" className="block text-gray-700 font-bold">
          {t("Nom")}
        </label>
        <input
          type="text"
          id="Nom"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder={t("Nom")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="Phone" className="block text-gray-700 font-bold">
          {t("Telephone")}
        </label>
        <input
          type="text"
          id="Phone"
          className="w-full shadow rounded border px-3 py-2 text-gray-700 focus:outline-none"
          placeholder={t("Telephone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default InputsLaboratory;
