import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer       from "./login/loginReducer";
import roleReducer       from "./roles/roleReducer";
import permissionReducer from "./permissions/permissionReducer";
import userReducer from "./users/userSlice";
import treatReducer from "./treatments/treatmentSlice";
import labReducer from "./laboratory/laboratorySlice";
import patientLabReducer from "./laboratory/patients/patientLabSlice";
import paymentLabReducer from "./laboratory/payments/paymentLabSlice";
import treatmentLabReducer from "./laboratory/treatments/treatmentLabSlice";
import accountLabReducer from "./laboratory/accounts/accountLabSlice";
import assuranceReducer from "./assurances/assuranceSlice";
import patientReducer from "./patients/patientSlice";
import paymentMethodReducer from "./paymentMethods/paymentMethodSlice";
import devisReducer from "./devis/devisSlice";
import paymentReducer from "./payments/paymentSlice";
import ficheReducer from "./fiches/ficheSlice";
import invoiceReducer from "./invoices/invoiceSlice";
import consumptionLabReducer from "./laboratory/consumptions/consumptionLabSlice";
import setAppointmentReducer from "./setAppoint/setAppointSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "dentist",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ 
  login: loginReducer,
  roles: roleReducer,
  permissions: permissionReducer,
  users: userReducer,
  treatments: treatReducer,
  laboratory: labReducer,
  patientLab: patientLabReducer,
  paymentLab: paymentLabReducer,
  treatmentLab: treatmentLabReducer,
  accountLab: accountLabReducer,
  assurances: assuranceReducer,
  patients: patientReducer,
  paymentMethods: paymentMethodReducer,
  devis: devisReducer,
  payments: paymentReducer,
  fiches: ficheReducer,
  invoices: invoiceReducer,
  consumptionLab: consumptionLabReducer,
  setAppointment: setAppointmentReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type State = ReturnType<typeof rootReducer>
