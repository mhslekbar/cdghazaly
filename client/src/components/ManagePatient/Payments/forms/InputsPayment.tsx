import React, { useContext, useEffect, useState } from 'react'
import { DataPaymentsContext, DefaultPaymentMethodInterface, EnumTypeModalPayment, EnumTypePayment, ShowPaymentsContext } from '../types'
import { InputElement } from '../../../../HtmlComponents/InputElement'
import { useLocation, useParams } from 'react-router'
import { DefaultUserInterface, UserInterface } from '../../../users/types'
import { useDispatch } from 'react-redux'
import { State } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { ShowUserApi } from '../../../../redux/users/UserApiCalls'
import { SelectElement } from '../../../../HtmlComponents/SelectElement'
import { UserData, get } from '../../../../requestMethods'
import { ShowPaymentMethodApi } from '../../../../redux/paymentMethods/paymentMethodApiCalls'
import { PatientInterface } from '../../../patients/types'
import { AssuranceInterface } from '../../../assurances/types'

const InputsPayment = () => {
  const { 
      amount, setAmount,
      type, setType,
      doctor, setDoctor,
      paymentMethod, setPaymentMethod,
      supported, setSupported,
      createdAt, setCreatedAt
   } = useContext(DataPaymentsContext)
   
   const { ModalType } = useContext(ShowPaymentsContext)

   const location = useLocation()
   const [showAmountInput, setShowAmountInput] = useState(true)

   useEffect(() => {
    switch(location.pathname.split("/")[5]) {
      case EnumTypePayment.PAYMENT: 
        setType(EnumTypePayment.PAYMENT)
        setShowAmountInput(true)
      break;
      case EnumTypePayment.CONSULTATION: 
        setType(EnumTypePayment.CONSULTATION)
        setShowAmountInput(false)
      break;
      case EnumTypePayment.SOINS: 
        setType(EnumTypePayment.SOINS)
        setShowAmountInput(true)
      break;
      default: 
        setType(EnumTypePayment.PAYMENT)
    }
   }, [location, setType])


   const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([DefaultUserInterface])

   const dispatch: any = useDispatch()
   const { users } = useSelector((state: State) => state.users)
   const { patients } = useSelector((state: State) => state.patients)
   const { paymentMethods } = useSelector((state: State) => state.paymentMethods)

   const { doctorId } = useParams()

   useEffect(() => {
     const fetchUsers = async () => {
       await dispatch(ShowUserApi())
     }
     fetchUsers()
   }, [dispatch])
 
   useEffect(() => {
     setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
   }, [users])
 
   useEffect(() => {
    const doctorData = UserData().doctor.cabinet
    ModalType === EnumTypeModalPayment.ADD_MODAL && setDoctor(doctorData ? UserData() : ArrayOfDoctors.find(doctor => doctor._id === doctorId) || DefaultUserInterface)
    // setDoctor(doctorData ? UserData() : ArrayOfDoctors[0])
   }, [ArrayOfDoctors, setDoctor, ModalType, doctorId])


  useEffect(() => {
    const fetchPaymentMethod = async () => {
      await dispatch(ShowPaymentMethodApi())
    }
    fetchPaymentMethod();
  }, [dispatch])

  const { patientId } = useParams()
  const [isSupport, setIsSupport] = useState(false)
  
  useEffect(() => {
    const result = patients.find((patient: PatientInterface) => patient._id === patientId)
    setIsSupport((result?.assurance?.society && true) || false)
    const fetchPriceCons = async () => {
      if(result?.assurance) {
        const response = await get(`assurance`)
        const Assurance = response?.data?.success.find((data: AssuranceInterface) => data._id === result?.assurance.society)
        setAmount(Assurance?.cons_price)
      } else {
        const response = await get(`setting`)
        setAmount(response?.data?.success[0]?.cons_price)
      }
    }
    if(type === EnumTypePayment.CONSULTATION) {
      fetchPriceCons()
    }
  }, [patientId, patients, setAmount, type])


  return (
    <React.Fragment>
      {showAmountInput &&
        <InputElement type='number' name="Montant" placeholder='Donner le montant...' value={amount} setValue={setAmount} />
      }
      {isSupport ?
        <InputElement name="Prise en charge" value={supported} setValue={setSupported} />
      :      
      <SelectElement  
        name='Mode de paiement'
        valueType="object"
        id="paymentMethod"
        value={paymentMethod}
        setValue={setPaymentMethod}
        options={ paymentMethods
          .map((option: any) => ({_id: option._id, name: option.name}))
        }
        defaultOption={<option data-element={JSON.stringify(DefaultPaymentMethodInterface)}>cash</option>
      } 
      />
      }
      <SelectElement name="Doctor" valueType="object" id="doctor" value={doctor} setValue={setDoctor} options={ArrayOfDoctors.map((option: any) => ({...option, name: option.username}))} />
      <InputElement type="date" name="Date" value={createdAt} setValue={setCreatedAt} />
    </React.Fragment>
  )
}

export default InputsPayment
