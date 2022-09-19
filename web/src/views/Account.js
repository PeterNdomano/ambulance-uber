import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, getInlineLoader, } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';

export default function Account() {
  const appContext = useContext(AppContext);

  const showWishlist = () => {
    if(appContext.isLoggedIn()) {
      window.location.href="#/account-wishlist";
    }
    else {
      tellUser('Log in or Register please');
    }
  }

  const showSettings = () => {
    if(appContext.isLoggedIn()) {
      window.location.href="#/account-settings";
    }
    else {
      tellUser('Log in or Register please');
    }
  }

  const showAddress = () => {
    if(appContext.isLoggedIn()) {
      window.location.href="#/account-shipping-addresses";
    }
    else {
      tellUser('Log in or Register please');
    }
  }

  const showPayments = () => {
    if(appContext.isLoggedIn()) {
      window.location.href="#/account-payment-methods";
    }
    else {
      tellUser('Log in or Register please');
    }
  }

  const applyForSeller = () => {
    if(appContext.isLoggedIn()) {
      if(appContext.isUserVerified()) {
        //show seller request application form
        window.location.href="#/become-a-seller";
      }
      else {
        //show account verification page
        tellUser('Verify your account first before applying for selling');
        appContext.showVerificationPage(() => {
          window.location.href="#/become-a-seller";
        });
      }
    }
    else {
      tellUser('Login or Register first');
      appContext.showLoginPage();
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 accountIntro">

          <div className="d-flex accountInfo">
            <BsPersonCircle className="mIcon align-self-center"/>
            <div className="align-self-center" style={{ width:"250px", wordWrap:"break-word" }}>
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
                "Client"
              }
              </h3>
            </div>
          </div>


          {/*
            <div className="d-flex justify-content-end">
              <div onClick={showWishlist} className="text-center p-2" style={{ cursor:"pointer" }}>
                <TbHeart className="mShortcutIcon"/>
                <h3 className="mShortcutTitle">Change<br/>Password</h3>
              </div>
              <div onClick={showSettings} className="text-center p-2" style={{ cursor:"pointer" }}>
                <TbSettings className="mShortcutIcon"/>
                <h3 className="mShortcutTitle">Change<br/>Email/Phone</h3>
              </div>
            </div>
            */}

          <div className="text-right">
            {
              (appContext.authData.status === 1) ?
              <button onClick={appContext.logOut} className="btn align-self-center mBtn">
                <MdLogout size={20}/> &nbsp; Log Out
              </button> :
              <button onClick={appContext.showLoginPage} className="btn align-self-center mBtn">
                <MdLogin size={20}/> &nbsp; Log In
              </button>
            }
          </div>

        </div>

        <div className="col-md-6 holderDiv">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between" style={{ height:"calc(0.5 * var(--topBarHeight))" }}>
                <h3 onClick={() => { console.log(appContext.authData) }} className="mTitle align-self-center">My Rides</h3>
              </div>

              {
                (appContext.isLoggedIn()) ?
                <div className="text-left">
                {
                  (appContext.authData.user.rides && appContext.authData.user.rides.length > 0 ) ?
                  appContext.authData.user.rides.map((item, i) => {
                    return (
                      <div key={i} className="text-left">
                        <h6>{item.ambData.regNo}</h6>
                        <small className="text-muted">From: {item.location}</small><br/>
                        <small className="text-muted">To: {item.location}</small><br/>
                        <div className="text-right">
                          <small>Status: {(Number(item.status) === 1) ? <span className="text-success font-bold">Confirmed</span> : <span className="text-danger font-bold">Pending</span>}</small><br/>
                          <small className="">{item.date}</small><br/>
                        </div>
                        <hr/>
                      </div>
                    )
                  }) :
                  <h6>No rides were found</h6>
                }
                </div> :
                <div className="text-right" style={{ marginTop:"20px" }}><small className="text-muted">Your rides and bookings will appear here</small></div>
              }

            </div>
          </div>
        </div>

        {
          (appContext.isAdmin()) ?
          <div className="col-md-6 holderDiv">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between" style={{ height:"calc(0.5 * var(--topBarHeight))" }}>
                  <h3 className="mTitle align-self-center">Admin Panel</h3>
                </div>

                <div className="">

                  <div style={{ marginTop:"20px" }} className="text-right">
                    <button onClick={() => { window.location.href='#/manage' }} className="btn btn-accent btn-ndoms">Manage App</button>
                  </div>

                </div>
              </div>
            </div>
          </div> : <></>
        }
      </div>
    </div>
  )
}
