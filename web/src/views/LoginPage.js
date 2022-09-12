import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import $ from 'jquery';
import {
  tellUser,
  getInlineLoader,
  showMainLoader,
  hideMainLoader,
  callApi,
} from '../Helpers';
import CountryCodes from '../ones/CountryCodes';


export default function LoginPage(props) {
  const appContext = useContext(AppContext);
  const [ usePhone, setUsePhone ] = useState(true);

  const login = async () => {
    let email = $('#lEmail').val().trim();
    let phone = $('#lPhone').val().trim();
    let password = $('#lPassword').val().trim();
    let countryCode = $('#lCountryCode').val().trim();

    if(usePhone) {
      email = "";
    }
    else {
      phone = "";
    }

    if((usePhone && phone.length > 0) || (!usePhone && email.length > 0)) {
      if(password.length > 0) {
        //login process
        showMainLoader();
        await callApi('login.php', { email, phone, password, countryCode }).then((response) => {
          hideMainLoader();
          if(response.status === 1) {
            appContext.clearModal();
            appContext.refreshApp(() => {
              if(props.onSuccess){
                props.onSuccess();
              }
            });
            tellUser('Welcome back', 'success');
          }
          else {
            tellUser(response.msg);
          }
        });
      }
      else {
        tellUser('Invalid password.');
      }
    }
    else {
      tellUser('Invalid Email or Phone');
    }
  }
  return (
    <div className="container">
      <div style={{ maxWidth:"400px", margin:"0 auto", }}>
        <div className="form-group" style={{ display: (usePhone) ? "block" : "none"}}>
          <label className="d-flex justify-content-between">
            <span>Phone</span>
            <button onClick={() => setUsePhone(false)} className="btn btn-accent btn-sm font-bold">Use Email Instead</button>
          </label>
          <div className="row">
            <div className="col-4 form-group">
              <small className="form-text text-muted">Country</small>
              <select id="lCountryCode" defaultValue="255" type="text" className="form-control">
                <CountryCodes/>
              </select>
            </div>
            <div className="col-8 form-group">
              <small className="form-text text-muted">Phone <span className="text-danger">(Without Country code)</span></small>
              <input id="lPhone" type="text" className="form-control"/>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ display: (!usePhone) ? "block" : "none"}}>
          <label className="d-flex justify-content-between">
            <span>Email</span>
            <button onClick={() => setUsePhone(true)} className="btn btn-accent btn-sm font-bold">Use Phone Instead</button>
          </label>
          <input id="lEmail" type="email" className="form-control"/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input id="lPassword" type="password" className="form-control"/>
        </div>
        <div className="text-right">
          <button onClick={login} className="btn btn-primary btn-ndoms">
            Login
          </button>
          <hr/>
          <h6>
            Or <span onClick={appContext.showRegisterPage} className="font-bold" style={{ color:"var(--primaryColor)", cursor:"pointer", }}>Register Now</span>
          </h6>
        </div>
        <div className="text-left" style={{ marginTop:"30px" }}>
          <h6>
            Forgot your password? <span onClick={appContext.showResetPasswordPage} className="font-bold" style={{ color:"var(--danger)", cursor:"pointer", }}>Reset Here</span>
          </h6>
        </div>
      </div>
    </div>
  )
}
