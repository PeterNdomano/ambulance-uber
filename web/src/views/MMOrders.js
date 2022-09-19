import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import {
  tellUser,
  showMainLoader,
  hideMainLoader,
  getInlineLoader,
  callApi
} from '../Helpers';
import $ from 'jquery';

export default function MMOrders(props) {
  const appContext = useContext(AppContext);

  const approveRide = async (id) => {
    showMainLoader();
    await callApi("approve_ride.php", { itemId: id }).then((response)=> {
      hideMainLoader();
      if(response.status === 1) {
        tellUser('Ride was approved', 'success');
        appContext.auth();
      }
      else {
        tellUser(response.msg);
      }
    })
  }


  useEffect(() => {
    //..
  }, []);

  return (
    <>
      <NavBar supportTabbar={true} title="Clients' Rides"/>
      <div className="container">
        <div className="row">
        {
          (appContext.authData.user.allRides && appContext.authData.user.allRides.length > 0 ) ?
          appContext.authData.user.allRides.map((item, i) => {
            return (
              <div key={i} className="col-md-12 col-sm-12">
                <h6>{item.ambData.regNo}</h6>
                <small className="text-muted">From: {item.location}</small><br/>
                <small className="text-muted">To: {item.location}</small><br/>
                <div className="text-right">
                  {
                    (Number(item.status) === 0) ?
                    <>
                      <button onClick={() => { approveRide(item.id) }} className="btn btn-sm font-bold">Approve</button>
                      <br/>
                    </>
                    :
                    <></>
                  }
                  <small>Status: {(Number(item.status) === 1) ? <span className="text-success font-bold">Confirmed</span> : <span className="text-danger font-bold">Pending</span>}</small><br/>

                  <small className="">{item.date}</small><br/>
                </div>
                <hr/>
              </div>
            )
          }) :
          <h6>No rides were found</h6>
        }
        </div>
      </div>
    </>
  );
}
