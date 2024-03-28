import './app.css';
import InputTextField from './Components/textfield';
import { Agents } from './Fields/agents';
import { Uses } from './Fields/uses';
import { Types } from './Fields/types';
import { Neighborhoods } from './Fields/neighborhoods';
import { Zipcode } from './Fields/zipcode';
import { Cities } from './Fields/cities';
import { State } from './Fields/state';
import { Vented } from './Fields/vented';
import { Price } from './Fields/price';
import { Size } from './Fields/size';
import { Rent } from './Fields/rent';
import { Savebtn } from './Fields/savebtn';
import TristateButton from './Components/button';
import Box from '@mui/material/Box';

export function App(props) {
  const inputplaceholder = "Filter by text ...";
  const buttontext = "Reset Filter";
  
  return (
    <div className=''>
      <h1>Listings</h1>
      <Box  sx={{ display: 'flex' , flexDirection: 'column' , m: 1}}>
      
      <InputTextField inputplaceholder={inputplaceholder} />
      <Agents/>
      <Uses />
      <Types />
      <Neighborhoods />
      <Zipcode />
      <Cities />
      <State />
      <Vented />
      <Price />
      <Size />
      <Rent />
      <div className='price-range-btm'>
      <Savebtn />
      <TristateButton buttontext={buttontext}/>
      </div>
      </Box>
    </div>
  );
}
