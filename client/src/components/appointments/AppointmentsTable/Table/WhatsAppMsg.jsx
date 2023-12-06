import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { companyName } from '../../../../requestMethods';
import { calculateRelativeDay } from '../../../../functions/functions';

const WhatsAppMsg = ({ phone, time, date }) => {
  const [cabinetAr, setCabinetAr] = useState("")
  const [cabinetFr, setCabinetFr] = useState("")
  const [dateRdvTextAr, setDateRdvTextAr] = useState("")
  const [dateRdvTextFr, setDateRdvTextFr] = useState("")
  
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch(companyName) {
      case "cabinetibtissama": 
        setCabinetAr(`عيادة الابتسامه لجراحة الفم والاسنان`)
        setCabinetFr("Cabinet dentaire El ibtissama pour la chirurgie buccale et dentaire")
        setDateRdvTextAr(`اوقات الدوام في العيادة
          09:00-13:00
          16:00-21:00 
        كل يوم عدا الجمعه صباحا والاحد`)
        setDateRdvTextFr(`Horaires d'ouverture de la clinique : 
          09h00-13h00 
          16h00-21h00 
        tous les jours sauf vendredi matin et dimanche`)
      break;
      case "cdghazaly": 
        setCabinetAr("عيادة الغزالي لطب وتجميل الأسنان")
        setCabinetFr("Cabinet dentaire El Ghazaly")
      break;
    }
  }, [])
  
  
  const handleSendMessage = async () => {
    let arMsg = `السلام عليكم ..
    موعدكم ${calculateRelativeDay(date, "ar")} في حدود  الساعة ${time}
    ${date}
    --------------
    ${cabinetAr}
    ${dateRdvTextAr}
    `
  
    let frMsg = `
      Salam ..
      Votre rendez-vous est ${calculateRelativeDay(date, "fr")} à ${time}
      ${date}
      --------------
      ${cabinetFr}
      ${dateRdvTextFr}
    `
    const message = arMsg + frMsg;

    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`);
  };

  return (
    <FaWhatsapp onClick={handleSendMessage}  className='text-main absolute top-2 left-2' style={{
      fontSize: "20px"
    }} />
  );
}

export default WhatsAppMsg;
