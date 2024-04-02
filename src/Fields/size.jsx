import MinimumDistanceSlider from '../Components/rangeslider';

import React, { useState } from 'react';

export function Size(props) {
  const selectlabel = "Size";
// Define constants for slider values
const minValue = 12000000;
const maxValue = 35000000;

  const [sliderValue, setSliderValue] = useState([minValue, maxValue]); 
  const initialvalue = 0;
  const maxSliderValue = 40000000; 


  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div className=''>
       <MinimumDistanceSlider value={sliderValue} onChange={handleSliderChange} max={maxSliderValue} selectlabel={selectlabel}/>
       <div className='price-range-btm'>
       <span>{initialvalue}</span>
      <span>{maxSliderValue}</span>
        </div>
      
      
    </div>
  );
}
