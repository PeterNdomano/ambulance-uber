import React, { useContext, useEffect, useState } from 'react';
import { isMobile, scrollToTop } from '../Helpers';
import { MdPerson } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { TbSmartHome, TbMessage2 } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineNotifications } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { AppContext } from '../App';

export default function SideNav(props) {
  const appContext = useContext(AppContext);
  const [ navType, setNavType ] = useState(appContext.navType);
  const [ navId, setNavId ] = useState(appContext.navId);
  const [ activeNav, setActiveNav ] = useState(appContext.navType);

  const getActiveNav = () => {
    let navItems = [
      "home",
      "account",
      "cart",
      "notifications",
      "messages",
    ];

    let i = navItems.indexOf(navType);
    if(i >= 0) {
      setActiveNav(navItems[i]);
    }
    else {
      //..
    }
  }

  const navTo = (nav) => {
    scrollToTop();
    if(isMobile()) {
      appContext.closeSideNav()
    }
    window.location.href="#/"+nav;
  }

  useEffect(() => {
    setNavType(appContext.navType);
    setNavId(appContext.navId);
  }, [ appContext.navType, appContext.navId ]);

  useEffect(() => {
    getActiveNav();
  }, [ navType, navId ])
  return (
    <div id="sideNav" data-navopen={false} className="SideNav mShadow-4">
      <div className="container">
        <div className="d-flex mProfile mShadow-1">
          <BsFillPersonFill className="mIcon align-self-center"/>
          <div className="align-self-center" style={{ width:"150px", wordWrap:"break-word" }}>
            <h3 className="mName">
            {
              (appContext.authData.status === 1) ?
              (appContext.authData.user.info.phone || appContext.authData.user.info.email) :
              "Guest"
            }
            </h3>
            <h3 className="mRole">
            {
              (appContext.authData.status === 1) ?
              (appContext.authData.user.info.role) :
              "Buyer"
            }
            </h3>
          </div>
        </div>

        <div onClick={() => navTo('home') } data-active={(activeNav === "home") ? true : false} className="d-flex mNavItem">
          <TbSmartHome className="mIcon align-self-center"/>
          <h3 className="mTitle align-self-center">Home</h3>
          <span className="mLabel">900</span>
        </div>

        <div onClick={() => navTo('account') } data-active={(activeNav === "account") ? true : false} className="d-flex mNavItem">
          <BsPerson className="mIcon align-self-center"/>
          <h3 className="mTitle align-self-center">Account</h3>
          <span className="mLabel">900</span>
        </div>

        <div onClick={() => navTo('cart') } data-active={(activeNav === "cart") ? true : false} className="d-flex mNavItem">
          <FiShoppingCart className="mIcon align-self-center"/>
          <h3 className="mTitle align-self-center">Cart</h3>
          <span className="mLabel">900</span>
        </div>

        <div onClick={() => navTo('notifications') } data-active={(activeNav === "notifications") ? true : false} className="d-flex mNavItem">
          <MdOutlineNotifications className="mIcon align-self-center"/>
          <h3 className="mTitle align-self-center">Notifications</h3>
          <span className="mLabel">900</span>
        </div>

        <div onClick={() => navTo('messages') } data-active={(activeNav === "messages") ? true : false} className="d-flex mNavItem">
          <TbMessage2 className="mIcon align-self-center"/>
          <h3 className="mTitle align-self-center">Messages</h3>
          <span className="mLabel">900</span>
        </div>
      </div>
    </div>
  )
}
