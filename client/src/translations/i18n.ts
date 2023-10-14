import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { patientsFr } from "./french/patientsFr";
import { patientsEn } from "./english/patientsEn";
import { homePageFr } from "./french/homePageFr";
import { homePageEn } from "./english/homePageEn";
import { appointmentEn } from "./english/appointmentEn";
import { assuranceEn } from "./english/assuranceEn";
import { consumableEn } from "./english/consumableEn";
import { laboratoryEn } from "./english/laboratoryEn";
import { paymentModeEn } from "./english/paymentModeEn";
import { roleEn } from "./english/roleEn";
import { statisticsEn } from "./english/statisticsEn";
import { treatmentEn } from "./english/treatmentEn";
import { appointmentFr } from "./french/appointmentFr";
import { assuranceFr } from "./french/assuranceFr";
import { consumableFr } from "./french/consumableFr";
import { laboratoryFr } from "./french/laboratoryFr";
import { paymentModeFr } from "./french/paymentModeFr";
import { roleFr } from "./french/roleFr";
import { statisticsFr } from "./french/statisticsFr";
import { treatmentFr } from "./french/treatmentFr";
import { patientsAr } from "./arabic/patientsAr";
import { laboratoryAr } from "./arabic/laboratoryAr";
import { homePageAr } from "./arabic/homePageAr";
import { consumableAr } from "./arabic/consumableAr";
import { assuranceAr } from "./arabic/assuranceAr";
import { appointmentAr } from "./arabic/appointmentAr";
import { paymentModeAr } from "./arabic/paymentModeAr";
import { roleAr } from "./arabic/roleAr";
import { statisticsAr } from "./arabic/statisticsAr";
import { treatmentAr } from "./arabic/treatmentAr";
import { loginAr } from "./arabic/loginAr";
import { loginEn } from "./english/loginEn";
import { loginFr } from "./french/loginFr";
import { userAr } from "./arabic/userAr";
import { userEn } from "./english/userEn";
import { userFr } from "./french/userFr";

const resources = {
  ar: {
    translation: Object.assign(userAr, loginAr, appointmentAr, assuranceAr, consumableAr, homePageAr, laboratoryAr, patientsAr, paymentModeAr, roleAr, statisticsAr, treatmentAr)
  },
  en: {
    translation: Object.assign(userEn, loginEn, appointmentEn, assuranceEn, consumableEn, homePageEn, laboratoryEn, patientsEn, paymentModeEn, roleEn, statisticsEn, treatmentEn)
  },
  fr: {
    translation: Object.assign(userFr, loginFr, appointmentFr, assuranceFr, consumableFr, homePageFr, laboratoryFr, patientsFr, paymentModeFr, roleFr, statisticsFr, treatmentFr)
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") ?? "fr",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;