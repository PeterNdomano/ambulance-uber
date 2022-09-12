import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { HomeContext } from '../views/Home';
import { MdSearch } from 'react-icons/md';

export default function FeedSearch() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  useEffect(() => {

  }, []);


  return (
    <div className="FeedSearch">
      <div className="container">
        <input value={homeContext.searchTerm} onChange={(e) => homeContext.handleSearchTerm(e.target.value)} placeholder="Write Hospital and click search" className="form-control"/>
        <button onClick={homeContext.searchFeed} className="btn btn-sm"><MdSearch size={20}/></button>
      </div>
    </div>
  )
}
