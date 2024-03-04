import React from 'react'
import { companyName } from '../../requestMethods'

interface props {
  colSpan?: number
}

const FooterInvoice:React.FC<props> = ({ colSpan }) => {
  
  return (
    <tr>
      <td colSpan={colSpan}>
        {companyName === "chumanite" && <img className="hidden print:block" src="/assets/chumanite/footer.jpg" alt="footer" />}
      </td>
    </tr>
  )
}

export default FooterInvoice
