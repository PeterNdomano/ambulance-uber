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

export default function MMDisputes(props) {
  const appContext = useContext(AppContext);


  useEffect(() => {
    //..
  }, []);

  return (
    <>
      <NavBar supportTabbar={true} title="Customers' Disputes"/>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <h6>Goods </h6>
            <br/>
            <button onClick={() => { window.location.href='/' }} className="btn btn-accent btn-ndoms">Take me back</button>
          </div>
        </div>
      </div>
    </>
  );
}
