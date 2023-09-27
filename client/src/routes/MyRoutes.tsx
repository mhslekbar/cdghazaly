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
import ManagePatient from '../components/ManagePatient/ManagePatient';
import ShowDevis from '../components/ManagePatient/Devis/ShowDevis';
import ShowInvoices from '../components/ManagePatient/Invoices/ShowInvoices';
import ShowPayments from '../components/ManagePatient/Payments/ShowPayments';
import SoinsPayments from '../components/ManagePatient/Payments/SoinsPayments';
import ShowConsultations from '../components/ManagePatient/Payments/ShowConsultations';
import ShowFiches from '../components/ManagePatient/Fiches/ShowFiches';
import ShowConsumptions from '../components/ManagePatient/Lab_Consumption/ShowConsumptions';
import Appointments from '../pages/Appointments';
import ConfigAppointment from '../components/appointments/ConfigAppointment/ConfigAppointment';
import Statistics from '../pages/Statistics';
import Accounting from '../components/statistics/details/Accounting';
import Payments from '../components/statistics/details/Payments';
import Consumables from '../pages/Consumables';
import ShowPurchaseOrder from '../components/consumables/purchaseOrder/ShowPurchaseOrder';
import ShowMyConsumptions from '../components/consumables/consumptions/ShowMyConsumptions';
import ShowConsumableList from '../components/consumables/consumableList/ShowConsumableList';
import Permissions from '../pages/Permissions';
import ShowSupplier from '../components/consumables/suppliers/ShowSuppliers';
import AboutSupplier from '../components/consumables/suppliers/abouts/AboutSupplier';
import StatisticTreatments from '../components/statistics/Treatments/StatisticTreatments';

const MyRoutes:React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />  }>
        <Route path="/" element={<HomePage />}/>
        <Route path="/role" element={<Roles />}/>
        <Route path="/user" element={<Users />}/>
        <Route path="/laboratory" element={<Laboratory />} >
          <Route path=":labId" element />
          <Route path=":labId/accounts" element={<ShowLabAccounts />} />
          <Route path=":labId/treatments" element={<ShowTreatLab />} />
          <Route path=":labId/consumptions/:doctorId" element={<ShowLabConsumptions />} />
          <Route path=":labId/payments/:doctorId" element={<ShowPaymentLab />} />
          <Route path=":labId/patients/:doctorId" element={<ShowPatientsLab />} />
        </Route>
        <Route path="/treatment" element={<Treatments />}/>
        <Route path="/assurance" element={<Assurances />} >
          <Route path=":AssId" element />        
          <Route path=":AssId/treatments" element={<ShowTreatAssurance />}/>        
          <Route path=":AssId/patients/:doctorId" element={<ShowPatientsAssurance />}/>        
        </Route>
        <Route path="/patient/:ptType/:doctorId" element={<Patients />}/>
        <Route path="/patient/:doctorId/:patientId/Manage" element={<ManagePatient />}>
          <Route path="devis" element={<ShowDevis />} />
          <Route path="invoices" element={<ShowInvoices />} />
          <Route path="labo" element={<ShowConsumptions />} />
          <Route path="payments" element={<ShowPayments />} />
          <Route path="paymentsAssurance" element={<ShowPayments />} />
          <Route path="soins" element={<SoinsPayments />} />
          <Route path="consultations" element={<ShowConsultations />} />
          <Route path="fiches" element={<ShowFiches />} />
        </Route>

        <Route path="/appointments/:doctorId" element={<Appointments />} />
        <Route path="/appointments/:doctorId/config" element={<ConfigAppointment />} />
        <Route path="/statistics/:doctorId" element={<Statistics />}>
          <Route path='accounting' element={<Accounting />}/>
          <Route path='payments' element={<Payments />}/>
          <Route path='treatments' element={<StatisticTreatments />}/>
        </Route>

        <Route path="/Consumables/:doctorId" element={<Consumables />}>
          <Route path='purchase-order' element={<ShowPurchaseOrder />}/>
          <Route path='consumptions' element={<ShowMyConsumptions />}/>
          <Route path="consumable_list" element={<ShowConsumableList />}/>
          <Route path="suppliers" element={<ShowSupplier />}/>
          <Route path="suppliers/:supplierId" element={<AboutSupplier />}/>          
        </Route>

        <Route path="/permissions" element={<Permissions />}/>
        
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default MyRoutes
