import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { BASE_API_URL, tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, formatMoney } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';
import { HomeContext } from '../views/Home';
import EditGood from '../views/EditGood';
import OneGood from '../ones/OneGood';

export default function Oops(props) {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const [ item, setItem ] = useState(props.item);
  const viewItem = () => {
    let title = (item.regNo.length <= 20) ? item.regNo : (item.regNo).substr(0, 16)+"...";
    appContext.setModal(
      title,
      <OneGood item={item}/>
    )
  }

  useEffect(() => {
    //..
  }, []);

  useEffect(() => {
    setItem(props.item)
  }, [ props.item ]);

  return (
    <div className="FeedItem col-sm-12 col-md-4" onClick={viewItem}>
      <div className="card">
        <div className="card-body">
          <div className="mImg">
            <img src={BASE_API_URL+(item.img)} />
          </div>
          <div className="mTitle">
            <span >{(item.regNo.length <= 30) ? item.regNo : (item.regNo).substr(0, 25)+"..."}</span>
          </div>
          <div className="mPrice">
            <div className="text-muted">
              Tsh {formatMoney(item.price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
