import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';

export default function Oops(props) {
  const appContext = useContext(AppContext);




  useEffect(() => {
    //..
  }, []);

  return (
    <>
      <NavBar title="Ooops!"/>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <h6>We run into problems </h6>
            <br/>
            <button onClick={() => { window.location.href='/' }} className="btn btn-accent btn-ndoms">Take me back</button>
          </div>
        </div>
      </div>
    </>
  );
}
