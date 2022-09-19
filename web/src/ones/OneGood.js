import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { BASE_API_URL, tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, formatMoney } from '../Helpers';
import { MdNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import { TbHeart, TbShoppingCart } from 'react-icons/tb';
import { FiShoppingCart } from 'react-icons/fi';
import $ from 'jquery';
import { HomeContext } from '../views/Home';
import EditGood from '../views/EditGood';

export default function Oops(props) {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const [ item, setItem ] = useState(props.item);

  const bookNow = async () => {
    if(appContext.isLoggedIn()) {
      let from = $('#dFrom').val();
      let to = $('#dTo').val();

      if(Number(item.status) === 0) {
        if(from.trim().length > 0) {
          if(to.trim().length > 0) {
            showMainLoader();
            await callApi("book_ambulance.php", { to, from, itemId:item.id }).then((response) => {
              hideMainLoader();
              if(response.status === 1) {
                tellUser("Booking was successful", 'success');
                appContext.auth();
                appContext.clearModal();
              }
              else {
                tellUser(response.msg);
              }
            })
          }
          else {
            tellUser('Invalid destination');
          }
        }
        else {
          tellUser('Invalid location');
        }
      }
      else {
        tellUser('Ambulance  not available');
      }
    }
    else {
      appContext.showLoginPage();
      tellUser('Login first');
    }
  }

  useEffect(() => {

  }, []);

  useEffect(() => {
    setItem(props.item);

  }, [ props.item ]);


  return (
    <div className="OneGood">
      <div style={{ maxWidth:"400px", margin:"0 auto", }}>
        <div className="mImg">
          <img src={BASE_API_URL+item.img}/>
        </div>

        <div className="mTitle text-muted">
          {item.regNo}
        </div>

        <div className="mPrice">
          <small>Price Per Kilometer</small><br/>
          <h4 className="m1">Tsh {formatMoney(item.price)}</h4>
        </div>

        <div className="mPrice">
          <small>Hospitals</small><br/>
          <h4 className="m1">{item.hospitals}</h4>
        </div>

        <div className="mPrice">
          <small>Availability Status</small><br/>
          {
            (Number(item.status) === 1) ?
            <h6 className="text-danger font-bold">Not Available</h6> :
            <h6 className="text-success font-bold">Available</h6>
          }
        </div>

        <div className="mDescription">
          <h6 className="font-bold">Routes</h6>
          <pre className="font-light">{item.routes}</pre>
          <div className="form-group">
            <label>From</label>
            <input id="dFrom" className="form-control" />
          </div>
          <div className="form-group">
            <label>To</label>
            <input id="dTo" className="form-control" />
          </div>
        </div>

        <div className="mCheckout">
          <button onClick={bookNow} className="btn btn-ndoms btn-block btn-dark" style={{ height:"60px" }}>
            Book Now
          </button>
        </div>

      </div>

    </div>
  );
}
