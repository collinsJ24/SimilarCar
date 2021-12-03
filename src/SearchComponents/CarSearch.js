import React, { useState, useEffect } from "react";
import "../SearchComponents/SearchBar.css";
import "./CarSearch.scss";
import CarImage from "../CarSpecResults/CarImage";
import Loader from "react-loader-spinner";

const CarSearch = (props) => {
  const [selectedOption, setSelectedOption] = useState("Select a manufacturer");
  const [selectedOptionModel, setSelectedModel] = useState("Select a Model");
  const [carData, setCarData] = useState([]);
  const [imageLink, setImageLink] = useState();
  const [isImageSet, setImageSet] = useState(false);
  const [isLoaderSet, setLoader] = useState(false);
  const [showSelect, setShowSelect] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [carTitle, setCarTitle] = useState("");

  var data = {};
  var modelData = {};
  const filterChangeHandler = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
    data = carMakes.filter((item) => item.make === event.target.value);
    fetchCarModelHandler(data[0].makeId);
    setSelectedModel("Select a Model");
    setImageSet(false);
  };

  const filterChangeHandlerModel = (event) => {
    event.preventDefault();
    setSelectedModel(event.target.value);
    modelData = carModels.filter((item) => item.model === event.target.value);
    data = carMakes.filter((item) => item.makeId === modelData[0].makeId);
    const temp = {
      make: data[0].make,
      model: event.target.value,
    };
    setCarData(temp);
    //fetchCarYearsHandler(modelData[0].makeId, modelData[0].modelId);
  };

 /*  const filterChangeHandlerYear = (event) => {
    event.preventDefault();
    setSelectedYear(event.target.value);
    setImageLink(
      "http://api.carsxe.com/images?key=b8dwu3ka6_irdyu5pks_lppdk6ig0&year=" +
        event.target.value +
        "&make=" +
        carData.make +
        "&model=" +
        carData.model +
        "&format=json"
    );
    console.log(event.target.value);
    console.log(carData.make);
    console.log(carData.model);
    setCarTitle(
      carData.make + " : " + carData.model + " " + event.target.value
    );
  };
 */

  const setLoaderStatus = () => {
    setLoader(true);
    setImageSet(true);
    setShowButton(false);
  };

  const setImage = () => {
    console.log("Setting image");
    setImageSet(true);
    setLoader(false);
    setShowSelect(false);
  };

  const [carMakes, setCarMakes] = useState([]);
  const fetchCarMakesHandler = async () => {
    return await fetch(
      "https://stark-lowlands-96241.herokuapp.com/car/cars"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarMakes = data.map((carMakeData) => {
          return {
            make: carMakeData.make,
            makeId: carMakeData.make_id,
          };
        });
        setCarMakes(transformedCarMakes);
      });
  };

  const [carModels, setCarModels] = useState([]);
  const fetchCarModelHandler = async (makeId) => {
    return await fetch(
      "https://stark-lowlands-96241.herokuapp.com/car/" + makeId
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarModels = data.map((carModelData) => {
          return {
            model: carModelData.model,
            modelId: carModelData.model_id,
            makeId: makeId,
          };
        });
        setCarModels(transformedCarModels);
      });
  };

  useEffect(() => {
    fetchCarMakesHandler();
  }, []);

  return (
    <div className="CarDropdown">
      <div className="CarHeading"> {props.carHeading} </div>
      {!isLoaderSet && !isImageSet && (
        <img
          className="CarImage"
          src="https://www.carhuddle.com/images/default/car-default.jpg"
          alt="defult_image"
        ></img>
      )}
      {isLoaderSet && (
        <Loader
          classNames="loader"
          type="Circles"
          color="#00BFFF"
          height={50}
          width={50}
        />
      )}
      {isImageSet && (
        <CarImage
          onImageReadyToDisplay={setImage}
          imageLink={imageLink}
        ></CarImage>
      )}

      {showSelect && (
        <select
          className="select"
          value={selectedOption}
          onChange={filterChangeHandler}
        >
          <option value={selectedOption} disabled>
            {selectedOption}
          </option>
          {carMakes.map((carMake) => (
            <option value={carMake.make}>{carMake.make}</option>
          ))}
        </select>
      )}

      {showSelect && (
        <select
          className="select"
          value={selectedOptionModel}
          onChange={filterChangeHandlerModel}
        >
          <option value={selectedOptionModel} disabled>
            {selectedOptionModel}
          </option>
          {carModels.map((carModel) => (
            <option value={carModel.model}>{carModel.model}</option>
          ))}
        </select>
      )}

    {/*   {showSelect && (
        <select
          className="select"
          value={selectedYear}
          onChange={filterChangeHandlerYear}
        >
          <option value={selectedYear} disabled>
            {selectedYear}
          </option>
          {carYears.map((carYear) => (
            <option value={carYear.year}>{carYear.year}</option>
          ))}
        </select>
      )} */}

      {
        <button className="findCar" onClick={setLoaderStatus}>
          {" "}
          Find Car{" "}
        </button>
      }

      {!showSelect && <div className="carTitle"> {carTitle} </div>}
    </div>
  );
};

export default CarSearch;
