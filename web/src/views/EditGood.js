import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import { BsPersonCircle } from 'react-icons/bs';
import { BASE_API_URL, tellUser, showMainLoader, hideMainLoader, getInlineLoader, callApi, callApi2 } from '../Helpers';
import { MdLogin, MdOutlineLocalShipping, MdOutlinePayments, MdNavigateNext, MdOutlineAdd, MdLogout } from 'react-icons/md'
import { TbHeart, TbSettings } from 'react-icons/tb';
import $ from 'jquery';

export default function NewAmb(props) {
  const appContext = useContext(AppContext);
  const [ item, setItem ] = useState(props.item);

  const submit = async () => {
    let regNo = $('#aRegNo').val();
    let hospitals = '..'; //$('#aHospitals').val();
    let routes = $('#aRoutes').val();
    let price = $('#aPrice').val();
    let img = document.getElementById('img').files[0];

    if(regNo.trim().length > 0) {
      if(hospitals.trim().length > 0) {
        if(routes.trim().length > 0) {
          if(img || !img) {
            if(Number(price) > 0) {
              let formData = new FormData();
              formData.append('itemId', item.id);
              formData.append('regNo', regNo);
              formData.append('hospitals', hospitals);
              formData.append('routes', routes);
              formData.append('price', price);
              formData.append('img', img);

              showMainLoader();
              await callApi2("edit_ambulance.php", formData).then((response) => {
                hideMainLoader();
                if(response.status === 1) {
                  tellUser('Ambulance was edited', 'success');
                  appContext.clearModal();
                  if(props.onSuccess) {
                    props.onSuccess();
                  }
                }
                else {
                  tellUser(response.msg);
                }
              });
            }
            else {
              tellUser('Invalid price per kilometer');
            }
          }
          else {
            tellUser('Please upload an image of this ambulance');
          }
        }
        else {
          tellUser('Invalid route');
        }
      }
      else {
        tellUser('Invalid hospital');
      }
    }
    else {
      tellUser('Invalid registration number');
    }
  }

  useEffect(() => {
    setItem(props.item)
  }, [ props.item ]);

  useEffect(() => {
    //..
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label>Registration Number</label>
            <input defaultValue={item.regNo} maxLength={200} id="aRegNo" type="text" className="form-control"/>
          </div>

          {/*<div className="form-group">
            <label>Hospital(s)</label>
            <small className="form-text text-muted">Separate multiple with commas</small>
            <input defaultValue={item.hospitals} id="aHospitals" type="text" className="form-control"/>
          </div>*/}

          <div className="form-group">
            <label>Serving areas and routes</label>
            <small className="form-text text-muted">Separate multiple with commas</small>
            <textarea id="aRoutes" className="form-control" defaultValue={item.routes}></textarea>
          </div>

        </div>

        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label>Price</label>
            <input defaultValue={item.price} id="aPrice" type="number" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Image</label><hr/>
            <img src={BASE_API_URL+item.img} style={{ height:"var(--topBarHeight)" }}/>
            <small className="text-danger form-text">Upload Image below to replace current image</small>
            <input id="img" className="form-control" type="file"/>
          </div>

        </div>

        <div className="col-sm-12 col-md-12 text-center" style={{ paddingBottom:"30px" }}>
          <button onClick={submit} className="btn btn-primary btn-ndoms" style={{ minWidth:"200px" }}>SUBMIT</button>
        </div>

      </div>
    </div>
  );
}
