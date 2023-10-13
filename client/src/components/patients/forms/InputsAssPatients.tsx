import React, { useContext, useEffect } from "react";
import { InputCheckbox } from "../../../HtmlComponents/InputCheckbox";
import { DefaultDataInputsPatientContext } from "../types";
import { useSelector } from "react-redux";
import { State } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { ShowAssuranceApi } from "../../../redux/assurances/assuranceApiCalls";
import { AssuranceInterface } from "../../assurances/types";
import { InputRadio } from "../../../HtmlComponents/InputRadio";
import { InputElement } from "../../../HtmlComponents/InputElement";
import { useTranslation } from "react-i18next";

const InputsAssPatients = () => {
  const { assurances } = useSelector((state: State) => state.assurances);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchAssurances = async () => {
      await dispatch(ShowAssuranceApi());
    };
    fetchAssurances();
  }, [dispatch]);

  const {
    showAssurance,
    setShowAssurance,
    AssuranceCompany,
    setAssuranceCompany,
    RegNoProfessional,
    setRegNoProfessional,
    supported,
    setSupported,
    percentage,
    setPercentage,
  } = useContext(DefaultDataInputsPatientContext);
  
  const { t } = useTranslation()

  return (
    <div>
      <InputCheckbox
        name={t("Assuré")}
        id="Assurance"
        value={showAssurance}
        setValue={setShowAssurance}
      />
      {showAssurance && (
        <>
          <div className="flex items-start gap-2">
            {assurances.length > 0 &&
              assurances.map((ass: AssuranceInterface) => (
                <React.Fragment key={ass._id}>
                  <InputRadio
                    name="AssuranceCompany"
                    labelName={ass.name}
                    id={"AssuranceCompany" + ass._id}
                    value={ass._id}
                    checked={AssuranceCompany === ass._id}
                    setValue={setAssuranceCompany}
                  />
                </React.Fragment>
              ))}
          </div>
          <div className="grid grid-cols-3 gap-1">
            <InputElement
              placeholder={t("Matricule Professionel")}
              id="Matricule Professionel"
              value={RegNoProfessional}
              setValue={setRegNoProfessional}
            />
            <InputElement
              type="number"
              placeholder={t("Prise en charge")}
              id="Prise en charge"
              value={supported}
              setValue={setSupported}
            />
            <InputElement
              type="number"
              placeholder={t("Pourcentage couvré par la societé")}
              id="Pourcentage"
              value={percentage}
              setValue={setPercentage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InputsAssPatients;
