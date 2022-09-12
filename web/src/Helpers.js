import {useEffect, useRef, useState, useMemo} from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import Home from './views/Home';
import Account from './views/Account';
import AccountVerification from './views/AccountVerification';
import SellerRequest from './views/SellerRequest';
import ManageMarket from './views/ManageMarket';
import OneGood from './ones/OneGood';

export const BASE_API_URL = 'github_projects/ambulance-uber/api/';
//export const BASE_API_URL = '/igolyn/api/';

export function isMobile() {
  let screenWidth = window.innerWidth;
  if(screenWidth <= 576) {
    return true;
  }
  else {
    return false;
  }
}

export function callApi(url, params) {
  return new Promise(async (resolved, rejected) => {
    await $.post(BASE_API_URL+url, params, (data, status) => {
      console.log(data);
      if(status === 'success') {
        let response = JSON.parse(data);
        resolved(response);
      }
      else {
        let response = {
          status:0,
          msg: "Network error",
        }
        resolved(response);
      }

    })
  })
}

export function callApi2(url, formData) {
  return new Promise(async (resolved, rejected) => {
    await $.ajax({
      type: "POST",
      url: BASE_API_URL+url,
      processData: false,
      contentType: false,
      data: formData,
      beforeSend: () => {
        //..
      },
      error: () => {
        let response = {
          status:0,
          msg: "Network error",
        }
        resolved(response);
      },
      success: (data) => {
        console.log(data);
        let response = JSON.parse(data);
        resolved(response);
      }
    });
  })
}

export function tellUser(msg, id = "warning"){
  if(id === "success"){
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  else if(id === "warning"){
    toast.warn(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  else{
    toast(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

}


export function getInlineLoader(options = {}) {

  return (
    <Bars
      color={(options.color) ? options.color : "var(--dark)"}
      width={(options.width) ? options.width : "20px"}
      height={(options.height) ? options.height : "20px"}
      wrapperStyle={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export function scrollToTop() {
  $(window).scrollTop(0);
}

export function showMainLoader() {
  $('#mainLoader').fadeIn('slow');
}

export function hideMainLoader() {
  $('#mainLoader').fadeOut('slow');
}

export function getMainView(type, id) {
  if(type === "home" && id === undefined) {
    //home view
    return <Home/>;
  }
  else if(type === "account" && id === undefined) {
    //account view
    return <Account/>;
  }
  else if(type === "become-a-seller" && id === undefined) {
    //account view
    return <SellerRequest/>;
  }
  else if(type === "manage" && id === undefined) {
    //account view
    return <ManageMarket/>;
  }
  else {
    //default view
    return (
      <div className="container" style={{ height:"100px" }}>
        {getInlineLoader({
          width:"30px",
          height:"30px",
        })}
      </div>
    );
  }
}



export function formatMoney(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function formatMoneyShorten(num, digits = 2) {
  num = Number.parseFloat(num);
  if(num <= 1 && num >= -1 ) {
    return num;
  }

  const lookup = [
   { value: 1, symbol: "" },
   { value: 1e3, symbol: "K" },
   { value: 1e6, symbol: "M" },
   { value: 1e9, symbol: "B" },
   { value: 1e12, symbol: "T" },
   { value: 1e15, symbol: "P" },
   { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
