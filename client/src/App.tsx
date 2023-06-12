import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

import Login from './pages/Login'
import { useSelector } from 'react-redux';
import { State } from './redux/store';
import MainPage from './pages/MainPage';

const App:React.FC = () => {
  const { userData }: { userData: string[] } = useSelector((state: State) => state.login)

  useEffect(() => {
    document.querySelectorAll('input').forEach(element => {
      element.classList.add('uppercase');
    })
  }, [])

  if(Object.keys(userData).length === 0) {
    return <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
    </Router>
  } else {
    return <Router>
      <MainPage />      
      <div className='w-full min-h-[90vh] mx-auto px-4 py-6'>
        <MyRoutes />
      </div>
    </Router>
  }

}

export default App
