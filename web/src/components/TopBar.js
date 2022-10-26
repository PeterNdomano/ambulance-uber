import React, { useContext } from 'react';
import { TbMenu, TbAmbulance } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineNotifications, MdPersonOutline } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io';
import { AppContext } from '../App';
import { isMobile } from '../Helpers';

export default function TopBar(props) {
  const appContext = useContext(AppContext);
  return (
    <div id="topBar" className="TopBar" data-navopen={false}>
      <div className="container mShadow-4">
        <div className="d-flex" style={{ height:"100%" }}>
          <div className="align-self-center flex-grow-1 d-flex" style={{ height:"100%" }}>
            <h3 className="mTitle align-self-center">Ambulance Service</h3>
          </div>
          <div className="align-self-center flex-grow-1 d-flex justify-content-end" style={{ height:"100%" }}>
            <button onClick={() => window.location.href="#/home"} className="btn btn-sm mBtn align-self-center">
              <TbAmbulance size={22}/>
            </button>
            <button onClick={() => window.location.href="#/account"} className="btn btn-sm mBtn align-self-center">
              <MdPersonOutline size={22}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
