import React, { useEffect, useState } from 'react';
import { PatientInterface } from '../types';
import ButtonsForm from '../../../HtmlComponents/ButtonsForm';
import { companyName } from '../../../requestMethods';

interface props {
  modal: boolean
  toggle: any
  patientData: PatientInterface
}

const SendWhatsAppPatient:React.FC<props> = ({ modal, toggle, patientData }) => {
  const [cabinetAr, setCabinetAr] = useState<any>("")
  const [cabinetFr, setCabinetFr] = useState<any>("")
  
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch(companyName) {
      case "cabinetibtissama": 
        setCabinetAr(`عيادة الابتسامه لجراحة الفم والاسنان`)
        setCabinetFr("Cabinet dentaire El ibtissama pour la chirurgie buccale et dentaire")
      break;
      case "cdghazaly": 
        setCabinetAr("عيادة الغزالي لطب وتجميل الأسنان")
        setCabinetFr("Cabinet dentaire El Ghazaly")
      break;
    }
  }, [])

  let arMsg = `السلام عليكم، ${patientData.name}
  نرجوا منكم تسوية حسابكم المادي، البالغ قدره ${Math.abs(patientData.balance)}
  وشكرا.
  --------------
  ${cabinetAr}
  `

  let frMsg = `
    Salam, ${patientData.name}
    Vous avez une dette de ${Math.abs(patientData.balance)}
    Nous vous demandons de régler votre compte.
    Merci
    --------------
    ${cabinetFr}
  `
  const message = arMsg + frMsg;

  const handleSendMessage = async () => {
    window.open(`https://api.whatsapp.com/send?phone=${patientData?.contact?.whatsApp}&text=${encodeURIComponent(message)}`);
  };

  return (
    <div>
      {modal && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={toggle}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  {/* Start Modal Body */}
                  <form
                    className="mt-2 sm:ml-4 sm:text-left"
                    onSubmit={handleSendMessage}
                  >
                    <ButtonsForm typeBtn='Envoyer' toggle={toggle} />
                  </form>
                  {/* End Modal Body */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SendWhatsAppPatient
