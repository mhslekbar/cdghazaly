import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoute';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/HomePage';
import Roles from '../pages/Roles';
import Users from '../pages/Users';
import Treatments from '../pages/Treatments';
import Laboratory from '../pages/Laboratory';
import ShowLabAccounts from '../components/laboratory/accounts/ShowLabAccounts';
import ShowTreatLab from '../components/laboratory/treatments/ShowTreatLab';
import ShowLabConsumptions from '../components/laboratory/consumptions/ShowLabConsumptions';
import ShowPaymentLab from '../components/laboratory/payments/ShowPaymentLab';
import ShowPatientsLab from '../components/laboratory/patients/ShowPatientsLab';
import Assurances from '../pages/Assurances';
import ShowTreatAssurance from '../components/assurances/treatments/ShowTreatAssurance';
import ShowPatientsAssurance from '../components/assurances/patients/ShowPatientsAssurance';
import Patients from '../pages/Patients';

const MyRoutes:React.FC = () => {

  return (
    <Routes>
      <Route element={<ProtectedRoutes />  }>
        <Route path="/" element={<HomePage />}/>
        <Route path="/role" element={<Roles />}/>
        <Route path="/user" element={<Users />}/>
        <Route path="/laboratory" element={<Laboratory />} >
          {/* <Route path="/laboratory/:labId" element/> */}
          <Route path=":labId/accounts" element={<ShowLabAccounts />} />
          <Route path=":labId/treatments" element={<ShowTreatLab />} />
          <Route path=":labId/consumptions/:doctorId" element={<ShowLabConsumptions />} />
          <Route path=":labId/payments/:doctorId" element={<ShowPaymentLab />} />
          <Route path=":labId/patients/:doctorId" element={<ShowPatientsLab />} />
        </Route>
        <Route path="/treatment" element={<Treatments />}/>
        <Route path="/assurance" element={<Assurances />} >
          {/* <Route path="/assurance/:AssId" element /> */}
          <Route path=":AssId/treatments" element={<ShowTreatAssurance />}/>        
          <Route path=":AssId/patients/:doctorId" element={<ShowPatientsAssurance />}/>        
        </Route>
        <Route path="/patient/:ptType" element={<Patients />}/>
        <Route path="/patient/:ptType" element={<Patients />}/>
        <Route path="/patient/:ptType" element={<Patients />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default MyRoutes
