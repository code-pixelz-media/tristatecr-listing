
import { FilterForm } from './Includes/FilterForm';
import { GoogleMap } from './Includes/GoogleMap';
import { PropertyListing } from './Includes/PropertyListing';
import { AnchorTemporaryDrawer } from './Includes/mobiletoggle';
import './app.css';
// import './style.scss'
import Box from '@mui/material/Box';
export function App(props) {

  return (
    <div className=''>
      <Box  sx={{ display: 'flex'}}>
        <div className='left-content'>

        <FilterForm />
        </div>
      <div className='right-content'>
          <GoogleMap />
          <PropertyListing />
      </div>
      
      </Box>
    </div>
  );
}
