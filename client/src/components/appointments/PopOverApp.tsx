import React, { useState } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PopOverApp:React.FC= () => {
  const [popOverIsOpen, setPopOverIsOpen] = useState(false)

  return (
    <>
      <button className='shadow rounded bg-blue focus:outline-none px-2 py-2' onClick={() => setPopOverIsOpen(!popOverIsOpen)}>
        <BsGearFill style={{
          fontSize: "22px"
        }} />
      </button>
      {popOverIsOpen && (
        <div className="absolute right-0 mt-10 mr-4 py-2 w-48 bg-white z-10 rounded-md shadow-lg">
            <Link 
              to={`dayofwork`}
              className={`text-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 border-b`}
            >  
              Jour d'emploie
            </Link>
            <Link 
              to={`dayofwork`}
              className={`text-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
            >  
              Parameters
            </Link>
        </div>
      )}
    </>
  );
};

export default PopOverApp;
