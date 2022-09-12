import React, { useContext } from 'react';
import { TbMenu } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineNotifications } from 'react-icons/md';
import { AppContext } from '../App';
import { isMobile } from '../Helpers';

export default function TopBar(props) {
  const appContext = useContext(AppContext);
  return (
    <div id="topBar" className="TopBar" data-navopen={false}>
      <div className="container mShadow-4">
        <div className="d-flex" style={{ height:"100%" }}>
          <div className="align-self-center flex-grow-1 d-flex" style={{ height:"100%" }}>
            <TbMenu onClick={appContext.toggleSideNav} className="mIcon align-self-center mShadow-3"/>
            <h3 className="mTitle align-self-center">Igolyn</h3>
          </div>
          <div className="align-self-center flex-grow-1 d-flex justify-content-end" style={{ height:"100%" }}>
            <button onClick={() => window.location.href="#/cart"} className="btn btn-sm mBtn align-self-center">
              <span className="mCounter">9</span>
              <FiShoppingCart size={22}/>
            </button>
            <button onClick={() => window.location.href="#/notifications"} className="btn btn-sm mBtn align-self-center">
              <span className="mCounter">999+</span>
              <MdOutlineNotifications size={22}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
