import './App.css';
import VINResults from './CarSpecResults/VINResults';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { useState } from 'react';

const App = () => {

  const [VIN,setVIN] = useState("");
  const setDetailsVin = (vin) => {
    setVIN(vin);
  }
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home VIN = {setDetailsVin}/>} />
<Route path='/vin' element={<VINResults vinDetails = {VIN} />} />
        </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
