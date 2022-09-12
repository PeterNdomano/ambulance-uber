import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import $ from 'jquery';
import { MdClose } from 'react-icons/md';



export default function Component(props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    //..
    $('#confirmDialog').on('hide.bs.modal', () => {
      appContext.setShowDialog(false);
    });

  }, []);

  useEffect(() => {

    if(appContext.showDialog) {
      $('#confirmDialog').modal().show();
      $('#dialog-body').scrollTop(0);
    }
    else{
      $('#dialogCloser').click();
    }
  }, [appContext.showDialog]);
  return (
    <div>
      {/* modal */}
      <div  className="modal fade" id="confirmDialog" tabIndex="-1" role="dialog" aria-labelledby="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content z-depth-2">
            <div className="modal-header">
              <h5 style={{ color:"var(--primaryColor)" }} className="modal-title font-bold" id="exampleModalLongTitle">
                <b>Confirm Dialog</b>
              </h5>
              <button id="dialogCloser" type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{ color: "var(--darkColor)"}}><MdClose size={24} color="var(--secondaryColor)"/></span>
              </button>
            </div>
            <div className="modal-body" id="dialog-body">
              {props.msg}
              <div className="text-right" style={{ marginTop:"20px" }}>
                <button style={{ boxShadow:"none" }} className="btn btn-sm btn-ndoms text-dark" data-dismiss="modal" onClick={() => $('#dialogCloser').click()} >
                  Cancel
                </button>
                <button className="btn btn-sm btn-primary btn-ndoms"
                  onClick={() => {
                    props.onConfirm();
                    $('#dialogCloser').click();
                  }} >
                  Confirm
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal end*/}
    </div>
  );
}
