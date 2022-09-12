import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { BASE_API_URL, tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, callApi2 } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';

export default function EditGood(props) {
  const appContext = useContext(AppContext);
  const [ item, setItem ] = useState(props.item);

  const submit = async () => {
    let title = $('#gTitle').val();
    let price = $('#gPrice').val();
    let unit = $('#gUnit').val();
    let quantity = $('#gQuantity').val();
    let description = $('#gDescription').val();
    let img1 = document.getElementById('img1').files[0];
    let img2 = document.getElementById('img2').files[0];
    let img3 = document.getElementById('img3').files[0];

    if(title.trim().length > 0){
      if(price.trim().length > 0 && Number(price) > 0){
        if(description.trim().length > 0){
          if(unit.trim().length > 0) {
            if(quantity.trim().length > 0 && Number(quantity) > 0) {
              let formData = new FormData();
              formData.append('itemId', item.id);
              formData.append('title', title);
              formData.append('quantity', quantity);
              formData.append('unit', unit);
              formData.append('price', price);
              formData.append('description', description);
              formData.append('img1', img1);
              formData.append('img2', img2);
              formData.append('img3', img3);
              showMainLoader();
              await callApi2("edit_good.php", formData).then((response) => {
                hideMainLoader();
                if(response.status === 1) {
                  appContext.clearModal();
                  tellUser("Edited successfully", 'success');
                  if(props.onSuccess){
                    props.onSuccess();
                  }
                }
                else {
                  tellUser(response.msg);
                }
              });
            }
            else {
              tellUser('Invalid quantity');
            }
          }
          else {
            tellUser('Invalid unit');
          }
        }
        else {
          tellUser('Invalid description');
        }
      }
      else {
        tellUser('Invalid price');
      }
    }
    else {
      tellUser('Invalid title');
    }
  }

  useEffect(() => {
    //..
  }, []);

  useEffect(() => {
    setItem(props.item);
  }, [ props.item ]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label>Title</label>
            <input defaultValue={item.title} maxLength={200} id="gTitle" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Unit</label>
            <small className="form-text text-muted">For example set, Piece, Dozen, Lots</small>
            <input defaultValue={item.unit} id="gUnit" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Unit Price</label>
            <input defaultValue={item.price} id="gPrice" type="number" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea defaultValue={item.description} id="gDescription" className="form-control"></textarea>
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label>Available Quantity</label>
            <input defaultValue={item.quantity} id="gQuantity" type="number" className="form-control"/>
          </div>
          <div className="form-group">
            <label>Image #1</label>
            {
              (item.img1) ?
              <>
                <hr/>
                <img src={BASE_API_URL+item.img1} style={{ height:"var(--topBarHeight)" }}/>
                <small className="text-danger form-text">Upload Image below to replace Image #1</small>
              </>:
              ""
            }
            <input id="img1" className="form-control" type="file"/>
          </div>
          <div className="form-group">
            <label>Image #2</label>
            {
              (item.img2) ?
              <>
                <hr/>
                <img src={BASE_API_URL+item.img2} style={{ height:"var(--topBarHeight)" }}/>
                <small className="text-danger form-text">Upload Image below to replace Image #2</small>
              </>:
              ""
            }
            <input id="img2" className="form-control" type="file"/>
          </div>
          <div className="form-group">
            <label>Image #3</label>
            {
              (item.img3) ?
              <>
                <hr/>
                <img src={BASE_API_URL+item.img3} style={{ height:"var(--topBarHeight)" }}/>
                <small className="text-danger form-text">Upload Image below to replace Image #3</small>
              </>:
              ""
            }
            <input id="img3" className="form-control" type="file"/>
          </div>
        </div>

        <div className="col-sm-12 col-md-12 text-center">
          <button onClick={submit} className="btn btn-primary btn-ndoms" style={{ minWidth:"200px" }}>SAVE CHANGES</button>
        </div>

      </div>
    </div>
  );
}
