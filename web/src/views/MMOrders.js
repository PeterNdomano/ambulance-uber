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


  useEffect(() => {
    //..
  }, []);

  return (
    <>
      <NavBar supportTabbar={true} title="Customers' Orders"/>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <h6>Goods </h6>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
            <h1>sdfghjkl;  gf</h1>
          </div>
        </div>
      </div>
    </>
  );
}
