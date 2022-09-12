import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { HomeContext } from '../views/Home';
import FeedItem from '../ones/FeedItem';

export default function FeedSection() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  useEffect(() => {

  }, []);


  return (
    <div className="FeedSection">
      <h3 className="feedTitle">
        {
          (homeContext.isSearch) ?
          "Search results" :
          (homeContext.activeFilter === "all") ?
          "Available Ambulances" :
          "Available Ambulances for "+homeContext.activeFilter
        }
      </h3>

      <div className="row">
        {
          (homeContext.feedItems) ?
          <>
            {
              homeContext.feedItems.map((item, i) => {
                return <FeedItem key={i} item={item}/>
              })
            }
            { homeContext.feedTail }
          </> :
          homeContext.feedTail
        }
      </div>
    </div>
  )
}
