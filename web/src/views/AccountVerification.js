import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';

export default function AccountVerification(props) {
  const appContext = useContext(AppContext);
  const [ view, setView ] = useState(
    <div className="text-center">
      <h6>Requesting Verification Code</h6>
    </div>
  );

  const verify = async () => {
    let otpCode = $('#otpCode').val();
    if(otpCode.trim().length > 0) {
      showMainLoader();
      await callApi("verify_account.php", { otpCode }).then((response) => {
        hideMainLoader();
        if(response.status === 1) {
          appContext.clearModal();
          tellUser('Verification successful', 'success');
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
      tellUser('Invalid verification code');
    }
  }

  const requestOtp = () => {
    return new Promise(async (resolve, reject) => {
      await callApi("request_verification_code.php", {}).then((response) => {
        resolve(response);
      });
    })
  }

  useEffect(() => {
    showMainLoader();
    (
      async () => {
        await requestOtp().then((response) => {
          hideMainLoader();
          if(response.status === 1) {
            hideMainLoader();
            setView(
              <div className="text-left">
                <h6 className="font-regular" style={{ marginBottom:"30px" }}>{response.msg}</h6>
                <div className="form-group">
                  <label>Verification Code</label>
                  <input id="otpCode" className="form-control" type="text"/>
                </div>
                <div className="text-right">
                  <button onClick={verify} className="btn btn-primary btn-ndoms">Verify</button>
                </div>
              </div>
            );
          }
          else {
            setView(
              <div className="text-center">
                <h6 className="text-danger font-regular">{response.msg}</h6>
              </div>
            );
          }
        })
      }
    )();
  }, []);

  return (
    <div className="container">
      <div style={{ maxWidth:"400px", margin:"0 auto", }}>
        {view}
      </div>
    </div>
  )
}
