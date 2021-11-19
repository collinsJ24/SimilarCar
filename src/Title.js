import React from 'react'
import './Title.css';
import { useState } from 'react';
import CarVIN from './CarSpecResults/CarVIN';

function Title(props) {

  const [VinDetails, setVinDetails] = useState("");

  const setVINDetails = (vin) => {
    setVinDetails(vin);
    props.setVINDetails2(vin);
  }

  return (
    <div className="Title">
      <div className="heading">Similar Car</div>
     <CarVIN VINdetails = {setVINDetails} />
    </div>
  )
}

export default Title