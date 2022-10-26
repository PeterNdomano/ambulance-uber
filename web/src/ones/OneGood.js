import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { BASE_API_URL, tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, formatMoney } from '../Helpers';
import { MdNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import { FaCcPaypal } from 'react-icons/fa';
import { HiCreditCard } from 'react-icons/hi';
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
      let creditCard = $('#dCreditCard').val();
      let cvv = $('#dCvv').val();
      let exp = $('#dExp').val();


      if(Number(item.status) === 0) {
        if(from.trim().length > 0) {
          if(to.trim().length > 0) {
            if(creditCard.trim().length === 16) {
              if(exp.trim().length === 5) {
                if(cvv.trim().length === 3) {
                  showMainLoader();
                  await callApi("book_ambulance.php", { to, from, itemId:item.id, creditCard, cvv, exp }).then((response) => {
                    hideMainLoader();
                    if(response.status === 1) {
                      tellUser("Booking was successful, please wait for admin confirmation", 'success');
                      appContext.auth();
                      appContext.clearModal();
                    }
                    else {
                      tellUser(response.msg);
                    }
                  })
                }
                else {
                  tellUser('Invalid CVV');
                }
              }
              else {
                tellUser('Invalid card expiry date');
              }
            }
            else {
              tellUser('Invalid credit card number')
            }

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
          <small>Price</small><br/>
          <h4 className="m1">Tsh {formatMoney(item.price)}</h4>
        </div>


        {/*<div className="mPrice">
          <small>Hospitals</small><br/>
          <h4 className="m1">{item.hospitals}</h4>
        </div>*/}

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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6147581083633!2d35.742234914225776!3d-6.182286162296207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184de5576ca8c51d%3A0x498951ebfb7c228c!2sDodoma%20Regional%20Referral%20Hospital!5e0!3m2!1sen!2stz!4v1666819420583!5m2!1sen!2stz" width="600px" height="450px" style={{ border:"0" }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <pre className="font-light">{item.routes}</pre>
          <div className="row">
            <div className="form-group col-6">
              <label>From</label>
              <input id="dFrom" className="form-control" />
            </div>
            <div className="form-group col-6">
              <label>To</label>
              <input id="dTo" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12 text-center">
              <FaCcPaypal size={60}/>
              <HiCreditCard size={78}/>
            </div>
            <div className="form-group col-12">
              <label>Card Number</label>
              <input maxLength={16} id="dCreditCard" placeholder="XXXXXXXXXXXXXXXX" className="form-control" />
            </div>
            <div className="form-group col-6">
              <label>EXP</label>
              <input maxLength={5} id="dExp" className="form-control" />
            </div>
            <div className="form-group col-6">
              <label>CVV</label>
              <input maxLength={3} id="dCvv" className="form-control" />
            </div>
          </div>
        </div>

        <div className="mCheckout">
          <button onClick={bookNow} className="btn btn-ndoms btn-block btn-dark" style={{ height:"60px" }}>
            Pay & Book
          </button>
        </div>

      </div>

    </div>
  );
}
