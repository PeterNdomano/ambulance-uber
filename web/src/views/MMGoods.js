import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import NavBar from '../components/NavBar';
import {
  tellUser,
  showMainLoader,
  hideMainLoader,
  getInlineLoader,
  callApi
} from '../Helpers';
import $ from 'jquery';
import { TbLayoutGridAdd } from 'react-icons/tb'
import NewAmb from '../views/NewAmb';
import MMoneGood from '../ones/MMOneGood';

export default function MMGoods(props) {
  const appContext = useContext(AppContext);
  const [ goods, setGoods ] = useState(null);
  const [ ready, setReady ] = useState(false);
  const loadGoods = async () => {
    setReady(false);
    await callApi('get_ambulances.php', {}).then((response) => {
      if(response.status === 1) {
        setGoods(response.data);
        setReady(true);
      }
      else {
        tellUser(response.msg);
      }
    });
  }

  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <>
      <NavBar supportTabbar={true} title="Ambulances"/>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 text-right">
            <button
                onClick={() => {
                  appContext.setModal("Add New Ambulance", <NewAmb onSuccess={loadGoods}/>)
                }}
                className="btn btn-accent btn-ndoms">
                <TbLayoutGridAdd size={18} />
                &nbsp;Add New
              </button>
            <hr/>
          </div>

          <div className="col-md-12 col-sm-12 text-left" style={{minHeight:"50px", position:"relative" }}>
            {
              (ready) ?
              (goods) ?
              goods.map((item, i) => {
                return <MMoneGood onSuccess={loadGoods} item={item} key={i}/>
              }) :
              <h6>No goods were found</h6> :
              getInlineLoader("var(--dark)")
            }
          </div>
        </div>

      </div>
    </>
  );
}
