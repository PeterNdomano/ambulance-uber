import React, { useContext, useEffect, useState } from 'react';
import { isMobile, getInlineLoader, tellUser, getMainView } from '../Helpers';
import Footer from '../components/Footer';
import { AppContext } from '../App';
import $ from 'jquery';

export default function MainBody(props) {

  const appContext = useContext(AppContext);
  const [ view, setView ] = useState(getMainView(appContext.navType, appContext.navId));

  useEffect(() => {
    setView(getMainView(appContext.navType, appContext.navId));

    $('#modal').on('shown.bs.modal', () => {
      document.querySelector("body").style.overflow = "hidden";
    });

    $('#modal').on('hidden.bs.modal', () => {
      document.querySelector("body").style.overflow = "auto";
    });

    $('#confirmDialog').on('shown.bs.modal', () => {
      document.querySelector("body").style.overflow = "hidden";
    });

    $('#confirmDialog').on('hidden.bs.modal', () => {
      document.querySelector("body").style.overflow = "auto";
    });
  }, [])

  useEffect(() => {
    setView(getMainView(appContext.navType, appContext.navId));
  }, [ appContext.navType, appContext.navId ])
  return (
    <div id="mainBody" className="MainBody" data-navopen={false}>
      <div className="container">
        {view}
        <Footer/>
      </div>
    </div>
  )
}
