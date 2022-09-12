import React, { useEffect, useState, useContext, createContext, useRef } from 'react';
import { AppContext } from '../App';
import FeedSearch from '../views/FeedSearch';
import FeedBanner from '../views/FeedBanner';
import FeedFilters from '../views/FeedFilters';
import FeedSection from '../views/FeedSection';
import { getInlineLoader, callApi, tellUser } from '../Helpers';


export const HomeContext = createContext(null);
export default function Home() {
  const appContext = useContext(AppContext);
  const [ filters, setFilters ] = useState([
    'all',
    'fashion',
    'electronics',
    'tech',
    'vehicles',
    'decorations',
    'food and drinks',
  ])

  const [ activeFilter, setActiveFilter ] = useState('all');
  const [ loadingSubFeed, setLoadingSubFeed ] = useState(false);
  const [ isSearch, setIsSearch ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ maxBatchIndex, setMaxBatchIndex ] = useState(0);
  const [ nextBatchIndex, setNextBatchIndex ] = useState(0);
  const [ feedItems, setFeedItems ] = useState(null);
  const [ feedTail, setFeedTail ] = useState(
    <div className="col-12" style={{ minHeight:"100px" }}>
      {getInlineLoader()}
    </div>
  );

  const [ isFeedEnd, setIsFeedEnd ] = useState(false);

  const loadFeed = async () => {
    setFeedTail(
      <div className="col-12" style={{ minHeight:"100px" }}>
        {getInlineLoader()}
      </div>
    );
    await callApi("get_feed.php", { searchTerm, filter:activeFilter, batchIndex:1 }).then((response) => {
      if(response.status === 1) {

        if(response.data){
          if(response.data.length > 0) {
            setFeedItems(response.data);
            setMaxBatchIndex(response.maxBatchIndex);
            setNextBatchIndex(response.nextBatchIndex);
            if(Number(response.maxBatchIndex) === 1) {
              setIsFeedEnd(true);
            }
            else {
              setIsFeedEnd(false);

              //create feed tail that will trigger more items loading
              setFeedTail(
                <div className="col-12 text-center" style={{ minHeight:"100px", paddingTop:"20px" }}>
                  <button className="btn btn-sm btn-ndoms bg-dark text-light" onClick={() => { loadSubFeed(response.nextBatchIndex) }}>
                    Load More
                  </button>
                </div>
              )
            }

          }
          else {
            setFeedItems([]);
            setFeedTail(
              <div className="col-12 text-center"  style={{ minHeight:"100px" }}>
                <small>No items were found</small><br/>
              </div>
            )
          }
        }
        else {
          setFeedItems([]);
          setFeedTail(
            <div className="col-12 text-center" style={{ minHeight:"100px" }}>
              <small>No items were found</small><br/>
            </div>
          )
        }
      }
      else {
        //set tail view to retry btn
        setFeedTail(
          <div className="col-12 text-center" style={{ minHeight:"100px" }}>
            <small>Could not load items due to network error</small><br/>
            <button className="btn btn-sm btn-ndoms bg-dark text-light" onClick={loadFeed}>
              Try Again
            </button>
          </div>
        )
      }
    });
  }


  const loadSubFeed = async (batchIndex) => {
    if(!isFeedEnd && !loadingSubFeed) {
      setLoadingSubFeed(true);
      setFeedTail(
        <div className="col-12" style={{ minHeight:"100px" }}>
          {getInlineLoader()}
        </div>
      );

      await callApi("get_feed.php", { searchTerm, filter:activeFilter, batchIndex }).then((response) => {
        if(response.status === 1) {

          if(response.data){
            if(response.data.length > 0) {

              if(Number(response.maxBatchIndex) === Number(batchIndex)) {
                setIsFeedEnd(true);
              }
              else {
                setIsFeedEnd(false);
                setMaxBatchIndex(response.maxBatchIndex);
                setNextBatchIndex(response.nextBatchIndex);

                //create feed tail that will trigger more items loading
                setFeedTail(
                  <div className="col-12 text-center" style={{ minHeight:"100px", paddingTop:"20px" }}>
                    <button style={{ marginTop:"40px !important" }} className="btn btn-sm btn-ndoms bg-dark text-light" onClick={() => { loadSubFeed(response.nextBatchIndex) }}>
                      Load More
                    </button>
                  </div>
                )
              }

              setFeedItems((prevFeed) => {
                return [ ...prevFeed, ...response.data ]
              });
              setLoadingSubFeed(false);

            }
            else {
              setFeedTail(
                <div className="col-12 text-center" style={{ minHeight:"100px" }}>
                  <small>No more items were found</small><br/>
                </div>
              )
            }
          }
          else {
            setFeedTail(
              <div className="col-12 text-center" style={{ minHeight:"100px" }}>
                <small>No more items were found</small><br/>
              </div>
            )
          }
        }
        else {
          //set tail view to retry btn
          setFeedTail(
            <div className="col-12 text-center" style={{ minHeight:"100px" }}>
              <small>Could not load more items due to network error</small><br/>
              <button className="btn btn-sm btn-ndoms bg-dark text-light" onClick={loadFeed}>
                Try Again
              </button>
            </div>
          )
        }
      });
    }
  }

  const searchFeed = () => {
    if(searchTerm.trim().length > 0){
      setActiveFilter("")
      setIsSearch(true);
      loadFeed();
    }
    else {
      tellUser('Write something in the search box');
    }
  }

  const handleSearchTerm = (value) => {
    if(value.trim().length >= 0) {
      setSearchTerm(value);
    }
  }


  useEffect(()=> {
    if(isFeedEnd) {
      setFeedTail(
        <div className="col-12 text-center" style={{ minHeight:"100px" }}>
          <small>No more items were found</small>
        </div>
      );
    }
  }, [ isFeedEnd ]);

  useEffect(() => {
    if(activeFilter.trim().length > 0) {
      setSearchTerm("");
      setIsSearch(false);
      loadFeed();
    }
  }, [ activeFilter ]);


  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {

  }, []);


  const homeContext = {
    activeFilter,
    setActiveFilter,
    filters,
    isSearch,
    setIsSearch,
    searchTerm,
    setSearchTerm,
    searchFeed,
    handleSearchTerm,
    loadFeed,
    loadSubFeed,
    maxBatchIndex,
    setMaxBatchIndex,
    nextBatchIndex,
    setNextBatchIndex,
    feedItems,
    setFeedItems,
    feedTail,
    setFeedTail,
    isFeedEnd,
    setIsFeedEnd,
  }


  return (
    <HomeContext.Provider value={homeContext}>
      <FeedBanner/>
      <FeedFilters/>
      <FeedSearch/>
      <FeedSection/>
    </HomeContext.Provider>
  )
}
