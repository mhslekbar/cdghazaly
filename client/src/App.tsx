import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

import Login from './pages/Login'
import { useSelector } from 'react-redux';
import { State } from './redux/store';
import MainPage from './pages/MainPage';

const App:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)

  if(userData._id) {
    return <Router>
      <MainPage />      
      <div className='w-full min-h-[90vh] mx-auto px-4 py-6'>
        <MyRoutes />
      </div>
    </Router>
  } else {
    return <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
    </Router>
  }

}

export default App
