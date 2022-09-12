import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, isMobile, showMainLoader, hideMainLoader, getInlineLoader, callApi, scrollToTop } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';
import GuestUserWelcome from '../views/GuestUserWelcome';
import UnverifiedUserWelcome from '../views/UnverifiedUserWelcome';
import Oops from '../views/Oops';
import MMGoods from '../views/MMGoods';
import MMOrders from '../views/MMOrders';
import MMDisputes from '../views/MMDisputes';

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



  const getView = () => {
    if(appContext.isLoggedIn()){
      if(appContext.isUserVerified()){
        if(appContext.isSeller()){
          //already a seller
          if(appContext.isMarketVerified()) {
            //show market management
            setView(
              <>
                <div className="tabBar" id="tabBar" data-navopen={false}>
                  <div className="container">
                    <ul className="nav nav-pills nav-justified" id="manage-market-tab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active btn btn-sm" id="mm-goods-tab" data-toggle="pill" href="#mm-goods" role="tab" aria-controls="pills-home" aria-selected="true">Ambulances</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link btn btn-sm" id="mm-orders-tab" data-toggle="pill" href="#mm-orders" role="tab" aria-controls="pills-profile" aria-selected="false">Rides</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link btn btn-sm" id="mm-disputes-tab" data-toggle="pill" href="#mm-disputes" role="tab" aria-controls="pills-profile" aria-selected="false">Disputes</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="mm-goods" role="tabpanel" aria-labelledby="debts-receivable-tab">
                    <MMGoods/>
                  </div>
                  <div className="tab-pane fade" id="mm-orders" role="tabpanel" aria-labelledby="debts-payable-tab">
                    <MMOrders/>
                  </div>
                  <div className="tab-pane fade" id="mm-disputes" role="tabpanel" aria-labelledby="debts-payable-tab">
                    <MMDisputes/>
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
          setView(
            <Oops/>
          )
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

    let tabHandler =  (e) => {
      scrollToTop();
    }
    $('a[data-toggle="pill"]').on('shown.bs.tab', tabHandler);

    return (() => {
      $('a[data-toggle="pill"]').off('shown.bs.tab', tabHandler)
    })
  }, []);

  return view;
}
