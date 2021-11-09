import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import '../SearchComponents/SearchBar.css';
import './CarSearch.css';

const CarSearch = (props) => {
    const [selectedOption, setSelectedOption] = useState("Select a manufacturer");
  const filterChangeHandler = (option) => {
    setSelectedOption(option);
    console.log(selectedOption);
  };

  const [carMakes, setCarMakes] = useState([]);
  function fetchCarMakesHandler() {
    fetch('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=2021')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log(data);
        const transformedCarMakes = data.Makes.map((carMakeData) => {
          return {
            makeId: carMakeData.make_id
          };
        });
        setCarMakes(transformedCarMakes);
      });
  }

  useEffect( () => {fetchCarMakesHandler()},[]);

    return (
        <div className="CarDropdown">
             <div className="CarHeading"> {props.carHeading} </div>
            <SearchBar carMakes={carMakes} labelHeading="Select a manufacturer"
             onChangeFilter={filterChangeHandler}/>
             <SearchBar labelHeading="Select a Model"
             onChangeFilter={filterChangeHandler}/>
             <SearchBar labelHeading="Select a Version"
             onChangeFilter={filterChangeHandler}/>
        
        </div>
    );
}

export default CarSearch;