import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';
import GuestUserWelcome from '../views/GuestUserWelcome';
import UnverifiedUserWelcome from '../views/UnverifiedUserWelcome';
import Oops from '../views/Oops';

export default function SellerRequest(props) {
  const appContext = useContext(AppContext);
  const [ view, setView ] = useState(
    <div className="container" style={{ height:"100px" }}>
      {getInlineLoader({
        width:"30px",
        height:"30px",
      })}
    </div>
  );

  const createMarket = async () => {
    let name = $('#marketName').val();
    let country = $('#marketCountry').val();
    let region = $('#marketRegion').val();
    let description = $('#marketDescription').val();

    if(name.trim().length > 0) {
      if(country.trim().length > 0) {
        if(region.trim().length > 0) {
          if(description.trim().length > 0) {
            showMainLoader();
            await callApi('create_market.php', { name, country, region, description }).then((response) => {
              hideMainLoader();
              if(response.status === 1) {
                tellUser('Market was created, please wait for response from administrator', 'success');
                showMainLoader();
                window.location.reload();
              }
              else {
                tellUser(response.msg);
              }
            })
          }
          else {
            tellUser('Invalid market Description');
          }
        }
        else {
          tellUser('Invalid region');
        }
      }
      else {
        tellUser('Invalid country');
      }
    }
    else {
      tellUser('Invalid market name');
    }
  }

  const getView = () => {
    if(appContext.isLoggedIn()){
      if(appContext.isUserVerified()){
        if(appContext.isSeller()){
          //already a seller
          if(appContext.isMarketVerified()) {
            //take user to market management
            setView(
              <>
                <NavBar title="Setup your Online Market"/>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <h6>Your market is all set and verified, now you can post goods and receive orders</h6>
                      <br/>
                      <button onClick={() => { window.location.href='#/manage-market' }} className="btn btn-accent btn-ndoms">Manage Your Market</button>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          else if(appContext.isMarketUnverified()) {
            //wait for verification view
            setView(
              <>
                <NavBar title="Setup your Online Market"/>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <h6>We received your request, please wait for Administrator to verify your market or contact you. Thanks </h6>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          else if(appContext.isMarketSuspended()) {
            setView(
              <>
                <NavBar title="Setup your Online Market"/>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <h6>Your market is suspended, please contact support for more details</h6>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          else {
            setView(
              <Oops/>
            )
          }
        }
        else {
          //show market setup page
          setView(
            <>
              <NavBar title="Setup your Online Market"/>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Market name</label>
                      <small className="form-text text-muted">Cannot be changed afterwards</small>
                      <input id="marketName" type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                      <label>Country</label>
                      <input id="marketCountry" type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                      <label>Region</label>
                      <input id="marketRegion" type="text" className="form-control"/>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea id="marketDescription" className="form-control"></textarea>
                    </div>

                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-ndoms btn-block"
                        onClick={createMarket}
                      >
                        Create Market
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </>
          );
        }
      }
      else {
        setView(
          <UnverifiedUserWelcome
            onSuccess={() => {
              window.location.href="#/become-a-seller"
            }}
          />
        );
      }
    }
    else {
      setView(
        <GuestUserWelcome
          onSuccess={() => {
            window.location.href="#/become-a-seller"
          }}
        />
      );
    }
  }

  useEffect(() => {
    getView();
  }, []);

  return view;
}
