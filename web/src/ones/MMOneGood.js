import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, formatMoney } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';
import EditGood from '../views/EditGood';

export default function Oops(props) {
  const appContext = useContext(AppContext);
  const [ item, setItem ] = useState(props.item);

  const deleteItem = async () => {
    showMainLoader();
    await callApi("delete_amb.php", { itemId: item.id }).then((response)=> {
      hideMainLoader();
      if(response.status === 1) {
        tellUser('Ambulance was deleted', 'success');
        if(props.onSuccess){
          props.onSuccess();
        }
      }
      else {
        tellUser(response.msg);
      }
    })
  }

  const changeStatus = async () => {
    let status = (Number(item.status) === 1) ? '0' : '1';
    showMainLoader();
    await callApi("change_status_amb.php", { itemId: item.id, status }).then((response)=> {
      hideMainLoader();
      if(response.status === 1) {
        tellUser('Ambulance status was changed', 'success');
        if(props.onSuccess){
          props.onSuccess();
        }
      }
      else {
        tellUser(response.msg);
      }
    })
  }

  const editItem = () => {
    appContext.setModal(
      "Edit Good",
      <EditGood onSuccess={props.onSuccess} item={props.item} />
    )
  }

  useEffect(() => {
    //..
  }, []);

  useEffect(() => {
    setItem(props.item)
  }, [ props.item ]);

  return (
    <div className="oneRec card">
      <div className="card-body">
        <h3 className="mTitle">{item.regNo}</h3>

        <h6 className="mPrice">{formatMoney(item.price)}</h6>
        <small>{item.routes}</small>




        <div className="text-right" style={{ marginTop:"20px" }}>
          <h6 className="text-muted text-success" style={{ fontSize:"13px" }}>Status: { (Number(item.status) === 0) ? <span className="font-bold">Available</span> : <span className="font-bold text-danger">Not Available</span>}</h6>
          <button
            className="btn btn-sm font-bold"
            onClick={() => {
              appContext.setDialog(item.regNo+' will be deleted', deleteItem)
            }}
          >
            Delete
          </button>
          <button onClick={editItem} className="btn btn-sm font-bold">
            Edit
          </button>
          <button
            className="btn btn-sm font-bold"
            onClick={() => {
              appContext.setDialog('Confirm changing availability for '+item.regNo, changeStatus)
            }}
          >
            Change Availability
          </button>
        </div>
      </div>
    </div>
  );
}
