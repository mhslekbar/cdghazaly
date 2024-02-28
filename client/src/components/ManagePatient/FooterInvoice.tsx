import React from 'react'
import { companyName } from '../../requestMethods'

const FooterInvoice:React.FC = () => {
  
  return (
    <>
      {companyName === "chumanite" && <img className="hidden print:block" src="/assets/chumanite/footer.jpg" alt="footer" />}
    </>
  )
}

export default FooterInvoice
