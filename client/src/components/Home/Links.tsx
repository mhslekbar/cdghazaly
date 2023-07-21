import React, { useEffect, useState } from 'react'
import { FaBriefcaseMedical, FaChartLine, FaTooth, FaUser, FaCalendarCheck, FaUsersCog, FaUsers, FaShieldAlt } from "react-icons/fa";
import { MdOutlineAssuredWorkload } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import SearchPatient from './SearchPatient';
import { useNavigate } from 'react-router';
import { listTypePatient } from '../sidebar/types';
import Dropdown from '../sidebar/Dropdown';
import DropdownDoctor from '../sidebar/DropDownDoctor';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { ShowUserApi } from '../../redux/users/UserApiCalls';
import { UserInterface } from '../users/types';


const Links:React.FC = () => {
  const className = `px-10 py-6 bg-white hover:bg-main rounded-lg border flex flex-col justify-center items-center text-main`
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedDropDown, setSelectedDropDown] = useState<string>("")
  
  const [listDoctors, setListDoctors] = useState<any[]>([]);
  const { users } = useSelector((state: State) => state.users);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const filterDoctors = async () => {
      await dispatch(ShowUserApi());
    };
    filterDoctors();
  }, [dispatch]);

  useEffect(() => {
    setListDoctors(
      users
        .filter((user: UserInterface) => user.doctor?.cabinet)
        .map((user: UserInterface) => ({
          title: user.username,
          path: user._id,
        }))
    );
  }, [users]);

  return (
    <section className='grid grid-cols-3 gap-2 mt-3'>
      <div className={className} onClick={() => navigate("/user")}><FaUsers className='mb-3 text-4xl' />Utilisateurs</div>
      <Dropdown 
        linkList={listTypePatient}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="patients"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown)
          setSelectedDropDown("patients")
        }}
        pathDropDown="patient"
        icon={<FaUser className='mb-3 text-4xl' />}  
        FromHomePage={{className}}     
      />
      <div className={className} onClick={() => navigate("/treatment")}><FaBriefcaseMedical className='mb-3 text-4xl' />Traitements</div>      
      <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Rendez-Vous"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown)
          setSelectedDropDown("Rendez-Vous")
        }}
        pathDropDown="appointments"
        icon={<FaCalendarCheck className='mb-3 text-4xl' />}  
        FromHomePage={{className}}     
      />
      <SearchPatient />
      <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Statistiques Financiéres"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown)
          setSelectedDropDown("Statistiques Financiéres")
        }}
        pathDropDown="statistics"
        icon={<FaChartLine className='mb-3 text-4xl' />}  
        FromHomePage={{className}}   
        nestedLink="payments"
      />
      <div className={className} onClick={() => navigate("/assurance")}><MdOutlineAssuredWorkload className='mb-3 text-4xl' />Assurance</div>
      <DropdownDoctor
        linkList={listDoctors}
        openDropdown={openDropdown}
        selectedDropDown={selectedDropDown}
        name="Consommables"
        toggleDropDown={() => {
          setOpenDropdown(!openDropdown)
          setSelectedDropDown("Consommables")
        }}
        pathDropDown="Consumables"
        icon={<BsCart4 className='mb-3 text-4xl' />}  
        FromHomePage={{className}}  
        nestedLink="consumptions"
      />
      <div className={className} onClick={() => navigate("/laboratory")}><FaTooth className='mb-3 text-4xl' />Laboratoires</div>
      <div className={className} onClick={() => navigate("role")}><FaUsersCog className='mb-3 text-4xl' /> Roles</div>
      <div className={className} onClick={() => navigate("/permissions")}><FaShieldAlt className='mb-3 text-4xl' />Permissions</div>

      {/* <div className={className} onClick={() => navigate("/appointments")}><FaCalendarCheck className='mb-3 text-4xl' />Rendez-vous</div> */}
      {/* <div className={className} onClick={() => navigate("/statistics")}><FaChartLine className='mb-3 text-4xl' />Statistiques Financiéres</div> */}
      {/* <div className={className} onClick={() => navigate("/Consumables")}><BsCart4 className='mb-3 text-4xl' />Consommables</div> */}
    </section>
  )
}

export default Links
// {/* <FaUser className='mb-3 text-4xl' />Patients */}