import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';

export default function SellerRequest(props) {
  const appContext = useContext(AppContext);




  useEffect(() => {
    //..
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h6 style={{ marginBottom:"30px" }}>You'll need to verify your account before continuing with this section</h6>
          <div className="text-left">
            <button className="btn btn-primary btn-ndoms" onClick={() => appContext.showVerificationPage(props.onSuccess)}>Verify Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
