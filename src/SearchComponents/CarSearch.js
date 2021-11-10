import React, { useState, useEffect } from 'react';
import '../SearchComponents/SearchBar.css';
import './CarSearch.css';

const CarSearch = (props) => {
    const [selectedOption, setSelectedOption] = useState("Select a manufacturer");
    const [selectedOptionModel, setSelectedModel] = useState("Select a Model");
    const [selectedYear, setSelectedYear] = useState("Select a Year");
    var data = {};
    var modelData = {};
  const filterChangeHandler = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
    data = carMakes.filter(item => item.make === event.target.value )
      console.log(data);
      fetchCarModelHandler(data[0].makeId);
      setSelectedModel("Select a Model");
      setSelectedYear("Select a Year");
  };

  const filterChangeHandlerModel = (event) => {
    event.preventDefault();
    setSelectedModel(event.target.value);
    modelData = carModels.filter(item => item.model === event.target.value )
    console.log(modelData);
    fetchCarYearsHandler(modelData[0].makeId,modelData[0].modelId);
  };

  const filterChangeHandlerYear = (event) => {
    event.preventDefault();
    setSelectedYear(event.target.value);
  };

  const [carMakes, setCarMakes] = useState([]);
  const fetchCarMakesHandler = async () => {
    return await fetch('https://databases.one/api/?format=json&select=make&api_key=5acf0ef8e0e8adbd62ae0f5dd')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarMakes = data.result.map((carMakeData) => {
          return {
            make: carMakeData.make,
            makeId: carMakeData.make_id
          };
        });
        setCarMakes(transformedCarMakes);
        console.log(transformedCarMakes);
      });
  }

  const [carModels, setCarModels] = useState([]);
  const fetchCarModelHandler = async (makeId) => {
    return await fetch('https://databases.one/api/?format=json&select=model&make_id=' + makeId + '&api_key=5acf0ef8e0e8adbd62ae0f5dd')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarModels = data.result.map((carModelData) => {
          return {
            model: carModelData.model,
            modelId: carModelData.model_id,
            makeId: makeId
          };
        });
        setCarModels(transformedCarModels);
      });
  }
  
  const [carYears, setCarYears] = useState([]);
  const fetchCarYearsHandler = async (makeId, modelId) => {
    return await fetch('https://databases.one/api/?format=json&select=year&make_id=' + makeId + '&model_id=' + modelId + '&api_key=5acf0ef8e0e8adbd62ae0f5dd')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarYears = data.result.map((carYearData) => {
          return {
            year: carYearData.year
          };
        });
        transformedCarYears.sort((a, b) => b.year.valueOf() - a.year.valueOf());
        setCarYears(transformedCarYears);
      });
  }
  
  
  useEffect( () => {fetchCarMakesHandler()},[]);

    return (
        <div className="CarDropdown">
             <div className="CarHeading"> {props.carHeading} </div>

             <select className="BarStyling"
     value={selectedOption}
     onChange={filterChangeHandler}
    ><option value={selectedOption} disabled >{selectedOption}</option>
    {carMakes.map((carMake) => <option value={carMake.make}>{carMake.make}</option>)}
    </select>

    <select className="BarStyling"
     value={selectedOptionModel}
     onChange={filterChangeHandlerModel}
    ><option value={selectedOptionModel} disabled >{selectedOptionModel}</option>
    {carModels.map((carModel) => <option value={carModel.model}>{carModel.model}</option>)}
    </select>
    
    <select className="BarStyling"
     value={selectedYear}
     onChange={filterChangeHandlerYear}
    ><option value={selectedYear} disabled >{selectedYear}</option>
    {carYears.map((carYear) => <option value={carYear.year}>{carYear.year}</option>)}
    </select>
        
        </div>
    );
}

export default CarSearch;