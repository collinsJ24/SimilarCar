import React, { useState, useEffect } from 'react';
import '../SearchComponents/SearchBar.css';
import './CarSearch.scss';
import CarImage from '../CarSpecResults/CarImage';

const CarSearch = (props) => {
    const [selectedOption, setSelectedOption] = useState("Select a manufacturer");
    const [selectedOptionModel, setSelectedModel] = useState("Select a Model");
    const [selectedYear, setSelectedYear] = useState("Select a Year");
    const [carData, setCarData] = useState([]);
    const [imageLink, setImageLink] = useState();
    const [isImageSet, setImageSet ] = useState(false);

    var data = {};
    var modelData = {};
  const filterChangeHandler = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
    data = carMakes.filter(item => item.make === event.target.value )
      fetchCarModelHandler(data[0].makeId);
      setSelectedModel("Select a Model");
      setSelectedYear("Select a Year");
      setImageSet(false);
  };

  const filterChangeHandlerModel = (event) => {
    event.preventDefault();
    setSelectedModel(event.target.value);
    modelData = carModels.filter(item => item.model === event.target.value )
    data = carMakes.filter(item => item.makeId ===  modelData[0].makeId)
    const temp = {
        make: data[0].make,
        model: event.target.value
      };
    setCarData(temp);
    fetchCarYearsHandler(modelData[0].makeId,modelData[0].modelId);
  };

  const filterChangeHandlerYear = (event) => {
    event.preventDefault();
    setSelectedYear(event.target.value);
    setImageLink('http://api.carsxe.com/images?key=b8dwu3ka6_irdyu5pks_lppdk6ig0&year='
     + event.target.value + '&make=' + carData.make + '&model=' + carData.model + '&format=json')
    console.log(event.target.value);
    console.log(carData.make);
    console.log(carData.model);
    setImageSet(true);
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
             {!isImageSet && 
        <img className="CarImage" src= "https://www.pngfind.com/pngs/m/202-2027599_png-file-svg-car-symbol-vector-transparent-png.png" alt="defult_image" ></img>
        }
             {isImageSet && 
        <CarImage imageLink={imageLink}></CarImage>
}
             <select className="select"
     value={selectedOption}
     onChange={filterChangeHandler}
    ><option value={selectedOption} disabled >{selectedOption}</option>
    {carMakes.map((carMake) => <option value={carMake.make}>{carMake.make}</option>)}
    </select>

    <select className="select"
     value={selectedOptionModel}
     onChange={filterChangeHandlerModel}
    ><option value={selectedOptionModel} disabled >{selectedOptionModel}</option>
    {carModels.map((carModel) => <option value={carModel.model}>{carModel.model}</option>)}
    </select>
    
    <select className="select"
     value={selectedYear}
     onChange={filterChangeHandlerYear}
    ><option value={selectedYear} disabled >{selectedYear}</option>
    {carYears.map((carYear) => <option value={carYear.year}>{carYear.year}</option>)}
    </select>

    <button className="findCar" > Find Car </button>
        </div>


    );
}

export default CarSearch;