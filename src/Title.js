import React from 'react'
import './Title.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
    <div className="Title">
      <div className="heading">Similar Car</div>
      <div class="search">
      <input type="text" class="searchTerm" placeholder="Enter VIN To Retrieve Vehicle Details & Market Valuation For Your Car"/>
      <button type="submit" class="searchButton">
      <FontAwesomeIcon icon={ faSearch }/>
     </button>
   </div>
    </div>
  )
}

export default Title