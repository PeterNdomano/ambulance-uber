import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import $ from 'jquery';
import {
  tellUser,
  getInlineLoader,
  showMainLoader,
  hideMainLoader,
  callApi,
} from '../Helpers'

export default function ResetPasswordPage(props) {
  const appContext = useContext(AppContext);

  const reset = async () => {
    let emailPhone = $('#lEmailPhone').val().trim();

    if(emailPhone.length > 0) {
      //login process
      showMainLoader();
      await callApi('reset_password.php', { emailPhone }).then((response) => {
        hideMainLoader();
        if(response.status === 1) {
          tellUser('You will receive instructions if this email or phone is registered on our system. Thanks', 'success');
          appContext.refreshApp(() => {
            if(props.onSuccess){
              props.onSuccess();
            }
          });
        }
        else {
          tellUser(response.msg);
        }
      });
    }
    else {
      tellUser('Invalid email or phone');
    }
  }
  return (
    <div className="container">
      <div style={{ maxWidth:"400px", margin:"0 auto", }}>
        <div className="form-group">
          <label>Email address or Phone Number</label>
          <input id="rEmailPhone" type="email" className="form-control"/>
        </div>
        <div className="text-right">
          <button onClick={reset} className="btn btn-primary btn-ndoms">
            Get Reset Link
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
