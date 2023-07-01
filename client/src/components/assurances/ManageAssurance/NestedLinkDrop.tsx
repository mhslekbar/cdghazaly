import React, { useContext } from 'react'
import { LinksInterface, ManageAssuranceContext } from './types'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import { ShowAssurancesContext } from '../types'

interface NestedLinkDropInterface {
  openDropdown: boolean,
  selectedDropDown: string,
  name: string,
  linkList: LinksInterface[],
  pathDropDown: string
}

const NestedLinkDrop:React.FC<NestedLinkDropInterface> = ({ openDropdown, selectedDropDown, name, linkList, pathDropDown }) => {
  const location = useLocation();
  const { setOpenDropdown } = useContext(ManageAssuranceContext)
  const navigate = useNavigate()
  const { AssId } = useParams()
  const { setSelectedDoctor } = useContext(ShowAssurancesContext)
  
  return (
    <div>
      {openDropdown && selectedDropDown === name && (
        //  right-0
        <div className={`z-10 absolute mr-3 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-menu-button"
          >
            {linkList.map((link: any, index) => (
              <button
                onClick={() => {
                  setOpenDropdown(false)
                  navigate(`${AssId}/${pathDropDown}/${link._id}`)
                  setSelectedDoctor(link)
                }}
                className={`${location.pathname.split("/")[3] === pathDropDown && location.pathname.split("/")[4] === link._id  ? "bg-gray-200" : ""} text-start block w-full px-4 py-2 pr-10 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
                key={index}
              >
                {link.username}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NestedLinkDrop
