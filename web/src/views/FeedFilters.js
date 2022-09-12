import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { HomeContext } from '../views/Home';

export default function FeedFilters() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  useEffect(() => {

  }, []);


  return (
    <div className="FeedFilters">
      {
        (homeContext.filters) ?
        homeContext.filters.map((item, i) => {
          return (
            <button
              onClick={() => {
                homeContext.setSearchTerm("");
                homeContext.setIsSearch(false);
                homeContext.setActiveFilter(item);
              }}
              key={i}
              className="btn btn-sm"
              data-active={(homeContext.activeFilter === item) ? true : false}
            >
              {item}
            </button>
          );
        }) : ""
      }
    </div>
  )
}
