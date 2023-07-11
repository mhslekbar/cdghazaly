import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppMsg = ({ phone, time, date }) => {
  let arMsg = `السلام عليكم ..
  موعدكم غدا في حدود  الساعة ${time}
  ${date}
  --------------
  عيادة الغزالي لطب وتجميل الأسنان`

  let frMsg = `
    Bonjour ..
    Votre rendez-vous est demain à ${time}
    ${date}
    --------------
    Cabinet dentaire El Ghazaly
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
