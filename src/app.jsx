import './app.css';
import InputTextField from './Components/textfield';
import Multiselect from './Components/multiselect';
import MinimumDistanceSlider from './Components/rangeslider';
import TristateButton from './Components/button';
import React, { useState } from 'react';

export function App(props) {
  const inputplaceholder = "Filter by text ...";
  const buttontext = "Reset Filter";
  const colourOptions = [
    'All',
    'Avi Akiav',
    'Avrum Deutsch',
    'Dov Bleich',
    'Duvv Biller',
    'Eddie Keda',
    'Elya Akiva',
  ].map(option => ({ value: option.toLowerCase(), label: option }));
// Define constants for slider values
const minValue = 10000;
const maxValue = 25000;

  const [sliderValue, setSliderValue] = useState([minValue, maxValue]); 
  const initialvalue = 0;
  const maxSliderValue = 45000; 


  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div className=''>
      <h1>Listings</h1>
      <InputTextField inputplaceholder={inputplaceholder} />
      <Multiselect colourOptions={colourOptions} />
      <MinimumDistanceSlider value={sliderValue} onChange={handleSliderChange} max={maxSliderValue} />
      <span>{initialvalue}</span>
      <span>{maxSliderValue}</span>
      <TristateButton buttontext={buttontext}/>
    </div>
  );
}
