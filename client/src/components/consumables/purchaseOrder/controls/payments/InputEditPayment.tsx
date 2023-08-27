import React, { useEffect, useState } from 'react'
import { formattedDate } from '../../../../../functions/functions'

interface InputEditPaymentInterface {
  value: number | string,
  type: string,
  paymentId: string
}

const InputEditPayment:React.FC<InputEditPaymentInterface> = ({ value, type, paymentId }) => {
  const [amount, setAmount] = useState<number | string>(value)
  
  useEffect(() => {
    if(type === "number") {
      setAmount(Number(value))
    } else if(type === "date") {
      setAmount(formattedDate(value.toString()))
    }
  }, [value, type])

  const handleChange = (e: any) => {
    if(type === "number") {
      setAmount(Number(e.target.value))
    } else if(type === "date") {
      setAmount(formattedDate(e.target.value))
    }
  }

  return (
    <>
      <input type={type} id={type === "number" ? `PaymentId${paymentId}` : `CreatedAtId${paymentId}`} className='focus:outline-none' value={amount} onChange={handleChange}/>
    </>
  )
}

export default InputEditPayment
