import React, { useEffect } from 'react'
import HomePageData from '../components/Home/HomePageData';
import { companyName } from '../requestMethods';

const HomePage:React.FC = () => {
  useEffect(() => {
    switch(companyName) {
      case "ibtissama": 
        document.documentElement.style.setProperty("--mainColor", `rgba(155, 89, 182, .8)`)
      break;
      default: 
        document.documentElement.style.setProperty("--mainColor", "#00b894")
      break;
    }
  }, [])

  return (
    <div>
      <HomePageData />
    </div>
  )
}

export default HomePage
