import React, { useContext } from 'react';
import './Bookmarked.css';
import { StoreContext } from '../../context/storeContext';
import AdItem from '../../components/adItem/AdItem';

const Bookmarked = () => {
  const { bookmarksData } = useContext(StoreContext);
  console.log(bookmarksData);
  
  return (
    <div className='bookmarkCont'>
      <h1>Ads your Bookmark Collection</h1>

      <div className="bookmarkDisplay">
        {bookmarksData?.map((item, index) => {
          return (
            <AdItem
              key={index}
              id={item._id}
              title={item.title}
              description={item.description}
              price={item?.price}
              adImage={item.adImage}
              state={item.state}
              condition={item?.condition}
              terms={item?.terms}
              item={item}
            />
          );
        })}

        {/* {!loading && search.length === 0 && (
          <div className="noAd">
            <h3>There are currently no results for this search <TbMoodCry /></h3>
            <p>You can click on the button below to create a new ad</p>
            <Link className="toCreateAd" to={'/create-ad'}>Post an Ad</Link>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Bookmarked