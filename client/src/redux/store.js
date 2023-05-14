import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer       from "./login/loginRedux";

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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'permissions/statusPermissionSuccess'],
      },
    }),
});

export let persistor = persistStore(store);
