import React from 'react';
import '../SearchComponents/SearchBar.css'

const SearchBar =  (props) => {
    console.log(props.labelHeading);
    const onDropdownSelect = (event) => {
        event.preventDefault();
        props.onChangeFilter(event.target.value);
      };
  return (
    <select className="BarStyling"
     value={props.labelHeading}
     onChange={onDropdownSelect}
    ><option value={props.labelHeading} disabled >{props.labelHeading}</option>
    </select>
  );
};

export default SearchBar