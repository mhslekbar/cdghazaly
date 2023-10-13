import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { companyName } from '../../../../requestMethods';

const WhatsAppMsg = ({ phone, time, date }) => {
  const [cabinetAr, setCabinetAr] = useState()
  const [cabinetFr, setCabinetFr] = useState()
  
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch(companyName) {
      case "ibtissama": 
        setCabinetAr("عيادة الابتسامه لطب وتجميل الأسنان")
        setCabinetFr("Cabinet dentaire El ibtissama")
      break;
      case "cdghazaly": 
        setCabinetAr("عيادة الغزالي لطب وتجميل الأسنان")
        setCabinetFr("Cabinet dentaire El Ghazaly")
      break;
    }
  }, [])
  
  let arMsg = `السلام عليكم ..
  موعدكم غدا في حدود  الساعة ${time}
  ${date}
  --------------
  ${cabinetAr}`

  let frMsg = `
    Bonjour ..
    Votre rendez-vous est demain à ${time}
    ${date}
    --------------
    ${cabinetFr}
  `
  const message = arMsg + frMsg;

  const handleSendMessage = async () => {
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`);
  };

  return (
    <FaWhatsapp onClick={handleSendMessage}  className='text-main absolute top-2 left-2' style={{
      fontSize: "20px"
    }} />
  );
}

export default WhatsAppMsg;
