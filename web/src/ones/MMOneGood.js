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
    await callApi("delete_good.php", { itemId: item.id }).then((response)=> {
      hideMainLoader();
      if(response.status === 1) {
        tellUser('Good was deleted', 'success');
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
        <h3 className="mTitle">{item.title}</h3>

        <h3 className="mPrice">{formatMoney(item.price)}</h3>
        <small>price per {item.unit}</small>

        <h3 className="mQuantity">{item.quantity}</h3>
        <small>Available Quantity in {item.unit}</small>

        <div className="text-right" style={{ marginTop:"20px" }}>
          <button
            className="btn btn-sm font-bold"
            onClick={() => {
              appContext.setDialog(item.title+' will be deleted', deleteItem)
            }}
          >
            Delete
          </button>
          <button onClick={editItem} className="btn btn-sm font-bold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
