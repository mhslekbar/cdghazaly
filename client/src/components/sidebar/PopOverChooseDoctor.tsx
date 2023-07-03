import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { State } from '../../redux/store';
import { DefaultUserInterface, UserInterface } from '../users/types';

type PopOverChooseDoctorType = {
  popOverIsOpen: boolean, 
  togglePopover: () => void,
  link?: any,
  pathDropDown: any
}

const PopOverChooseDoctor:React.FC<PopOverChooseDoctorType> = ({ popOverIsOpen, togglePopover, link, pathDropDown }) => {
  const location = useLocation()
  
  const { users } = useSelector((state: State) => state.users)
  const [ArrayOfDoctors, setArrayOfDoctors] = useState<UserInterface[]>([DefaultUserInterface])
  
  useEffect(() => {
    setArrayOfDoctors(users.filter((user: UserInterface) => user.doctor?.cabinet))
  }, [users])

  return (
    <>
      {popOverIsOpen && (
        <div className="absolute left-0 mt-2 py-2 w-48 bg-white z-10 rounded-md shadow-lg">
          {ArrayOfDoctors.map((user: UserInterface, index) =>       
            <Link to={`/${pathDropDown}${link.path ? "/"+link.path : ""}/${user._id}`} 
              className={`${location.pathname.split("/")[1] === pathDropDown && location.pathname.split("/")[2] === link.path && location.pathname.split("/")[3] === user._id ? "bg-gray-200" : "bg-transparent"}  text-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 border-b`}
              key={index}
            >  
              {user.username}
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default PopOverChooseDoctor;
