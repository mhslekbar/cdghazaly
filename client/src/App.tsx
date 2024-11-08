import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

import Login from './pages/Login'
import { useSelector } from 'react-redux';
import { State } from './redux/store';
import MainPage from './pages/MainPage';
import { companyName } from './requestMethods';

const App:React.FC = () => {
  const { userData } = useSelector((state: State) => state.login)


  useEffect(() => {
    switch(companyName) {
      case "cabinetibtissama": 
        document.documentElement.style.setProperty("--mainColor", `rgba(34, 166, 179,1.0)`)
        // document.documentElement.style.setProperty("--mainColor", `rgba(155, 89, 182, .8)`)
      break;
      case "cdghazaly": 
        document.documentElement.style.setProperty("--mainColor", "#00b894")
      break;
      case "chumanite": 
        document.documentElement.style.setProperty("--mainColor", "#e74c3c")
        document.documentElement.style.setProperty("--redColor", "#00b894")
      break;
      default: 
        document.documentElement.style.setProperty("--mainColor", "#00b894")
      break;
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("lang", localStorage.getItem("lang") ?? "fr")
    switch(localStorage.getItem("lang")) {
      case "ar": 
        document.body.dir = "rtl";
        localStorage.setItem("dir", "rtl")
      break;
      default:
        document.body.dir = "ltr";
        localStorage.setItem("dir", "ltr")  
    }
  }, [])



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
