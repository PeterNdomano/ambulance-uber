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

export default function RegisterPage(props) {
  const appContext = useContext(AppContext);
  const [ usePhone, setUsePhone ] = useState(true);

  const register = async () => {
    let email = $('#rEmail').val().trim();
    let phone = $('#rPhone').val().trim();
    let countryCode = $('#rCountryCode').val().trim();
    let password = $('#rPassword').val().trim();
    let confirm = $('#rConfirm').val().trim();
    if(usePhone) {
      email = "";
    }
    else {
      phone = "";
    }

    if((usePhone && phone.length > 0) || (!usePhone && email.length > 0)) {
      if(password.length >= 6) {
        if(password === confirm) {
          //register process
          showMainLoader();
          await callApi('register.php', { email, phone, password, countryCode }).then((response) => {
            hideMainLoader();
            if(response.status === 1) {
              appContext.clearModal();
              appContext.refreshApp(() => {
                if(props.onSuccess){
                  props.onSuccess();
                }
              });
              tellUser('Account was created', 'success');
            }
            else {
              tellUser(response.msg);
            }
          });
        }
        else {
          tellUser('Confirm your password correctly');
        }
      }
      else {
        tellUser('Invalid password. Password must have atleast 6 characters');
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
              <select id="rCountryCode" defaultValue="255" type="text" className="form-control">
                <CountryCodes/>
              </select>
            </div>
            <div className="col-8 form-group">
              <small className="form-text text-muted">Phone <span className="text-danger">(Without Country code)</span></small>
              <input id="rPhone" type="text" className="form-control"/>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ display: (!usePhone) ? "block" : "none"}}>
          <label className="d-flex justify-content-between">
            <span>Email</span>
            <button onClick={() => setUsePhone(true)} className="btn btn-accent btn-sm font-bold">Use Phone Instead</button>
          </label>
          <input id="rEmail" type="email" className="form-control"/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input id="rPassword" type="password" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input id="rConfirm" type="password" className="form-control"/>
        </div>
        <div className="text-right">
          <button onClick={register} className="btn btn-primary btn-ndoms">
            Register
          </button>
          <hr/>
          <h6>
            Or <span onClick={appContext.showLoginPage} className="font-bold" style={{ color:"var(--primaryColor)", cursor:"pointer", }}>Login Now</span>
          </h6>
        </div>
      </div>
    </div>
  )
}
