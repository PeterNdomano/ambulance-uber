import React, { useContext, useState, useEffect } from 'react';
import { TbMenu } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineNotifications, MdArrowBack, MdHome } from 'react-icons/md';
import { AppContext } from '../App';
import { isMobile } from '../Helpers';

export default function TopBar(props) {
  const appContext = useContext(AppContext);
  const [ title, setTitle ] = useState(props.title);
  const goBack = () => {
    window.history.back();
  }

  useEffect(() => {
    setTitle(props.title);
  }, [ props.title ])
  return (
    <div id="navBar" className="NavBar d-flex" data-support-tabbar={!!props.supportTabbar}>
      <MdArrowBack onClick={goBack} className="mIcon align-self-center flex-shrink-0"/>
      <h4 className="mTitle align-self-center flex-shrink-0">{title}</h4>
    </div>
  )
}
