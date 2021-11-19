import React from "react";
import { useState, useEffect } from "react";
import Title from "../Title";
import "./VINResults.scss";

const VINResults = (props) => {
  console.log(props.vinDetails);
  // const VIN = props.vinDetails;
  const [VINdetails, setVINdetails] = useState([]);
  const [showList, setShowList] = useState(false);

  const setShowListBoolean = () => {
    console.log(VINdetails);
    setShowList(true);
  };

  const fetchVINdetails = async (VINnumber) => {
    return await fetch("http://localhost:8080/car/cars/VIN/" + VINnumber)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCarDetails = data.map((VINdata) => {
          return {
            VIN: VINdata.VIN,
            VehicleType: VINdata.VehicleType,
            Trim: VINdata.Trim,
            Trim2: VINdata.Trim2,
          };
        });
        console.log(transformedCarDetails);
        setVINdetails(transformedCarDetails);
        setShowListBoolean();
      });
  };

  useEffect(() => {
    fetchVINdetails(props.vinDetails);
  }, []);

  return (
    <div>
      {" "}
      <Title />
      
      <article class="leaderboard">
<header>
      <h1 class="leaderboard__title"><span class="leaderboard__title--top">VIN</span><span class="leaderboard__title--bottom">Details</span></h1>
  </header>
  <main class="leaderboard__profiles">
  {VINdetails.map((carMake) => (
          <>
          <article class="leaderboard__profile">
      <span class="leaderboard__name">{carMake.VIN}</span>
      <span class="leaderboard__value">VIN</span>
    </article>
    <article class="leaderboard__profile">
      <span class="leaderboard__name">{carMake.VehicleType}</span>
      <span class="leaderboard__value">VehicleType</span>
    </article>
    <article class="leaderboard__profile">
      <span class="leaderboard__name">{carMake.tRIM}</span>
      <span class="leaderboard__value">Trim</span>
    </article>
    <article class="leaderboard__profile">
      <span class="leaderboard__name">{carMake.Trim2}</span>
      <span class="leaderboard__value">Trim</span>
    </article>
        
          </>
        ))}
    
  </main>
  </article>



    </div>
  );
};

export default VINResults;
