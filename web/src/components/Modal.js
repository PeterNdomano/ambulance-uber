import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import $ from 'jquery';
import { MdClose } from 'react-icons/md';



export default function Component(props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    //..
    $('#modal').on('hide.bs.modal', () => {
      appContext.setShowModal(false);
      appContext.clearModal();
    });

  }, []);

  useEffect(() => {

    if(appContext.showModal) {
      $('#modal').modal().show();
      $('#modal-body').scrollTop(0);
    }
    else{
      $('#modalCloser').click();
    }
  }, [appContext.showModal]);
  return (
    <div>
      {/* modal */}
      <div className="modal fade" id="modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content z-depth-1-half">
            <div className="modal-header">
              <h5 style={{ color:"var(--primaryColor)" }} className="modal-title font-bold" id="exampleModalLongTitle"><b>{props.title}</b></h5>
              <button id="modalCloser" type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{ color: "var(--darkColor)"}}><MdClose size={24} color="var(--darkColor)"/></span>
              </button>
            </div>
            <div className="modal-body" id="modal-body" style={{ padding:"0px", overflowX:"hidden" }}>
              {props.view}
            </div>
          </div>
        </div>
      </div>
      {/* modal end*/}
    </div>
  );
}
