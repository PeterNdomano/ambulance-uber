import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { HomeContext } from '../views/Home';
import test_banner from '../test_banner.jpg'

export default function FeedBanner() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  useEffect(() => {

  }, []);


  return (
    <div className="FeedBanner">
      <img src={test_banner}/>
    </div>
  )
}
