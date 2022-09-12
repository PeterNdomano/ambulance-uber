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
  const [ imgArray, setImgArray ] = useState(() => {
    let arr = [];
    if(item.img1) {
      arr.push(item.img1);
    }

    if(item.img2) {
      arr.push(item.img2);
    }

    if(item.img3) {
      arr.push(item.img3);
    }

    return arr;
  });

  useEffect(() => {

  }, []);

  useEffect(() => {
    setItem(props.item);
    setImgArray(() => {
      let arr = [];
      if(props.item.img1) {
        arr.push(props.item.img1);
      }

      if(props.item.img2) {
        arr.push(props.item.img2);
      }

      if(props.item.img3) {
        arr.push(props.item.img3);
      }

      return arr;
    })
  }, [ props.item ]);


  return (
    <div className="OneGood">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="mImg">
            {
              (imgArray.length >= 2) ?
              <>
                <button className="btn btn-sm mNext"><MdNavigateNext size={20}/></button>
                <button className="btn btn-sm mPrev"><MdOutlineNavigateBefore size={20}/></button>
              </>: ""
            }
            {
              imgArray.map((item, i) => {
                return (
                  <img key={i} src={BASE_API_URL+item}/>
                )
              })
            }

          </div>

          <div className="mActions d-flex justify-content-end">
            <TbHeart className="mIcon"/>
            <FiShoppingCart className="mIcon"/>
          </div>

          <div className="mTitle text-muted">
            {item.title}
          </div>

          <div className="mPrice">
            <h2 className="m1">Tsh {formatMoney(item.price)}</h2>
            <small>Per {item.unit}</small><br/>
            <small className="font-bold text-muted">{formatMoney(item.quantity)} Available</small>
          </div>
        </div>

        <div className="com-md-6 col-sm-12">
          <div className="mDescription">
            <h6 className="font-bold">Description</h6>
            <pre className="font-light">{item.description}</pre>
          </div>

          <div className="mCheckout">
            <button className="btn btn-ndoms btn-block btn-dark">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
