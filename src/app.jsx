
import { FilterForm } from './Includes/FilterForm';
import { GoogleMap } from './Includes/GoogleMap';
import { PropertyListing } from './Includes/PropertyListing';
import Box from '@mui/material/Box';
export function App(props) {

  return (
    <div className=''>
      <Box  sx={{ display: 'flex'}}>
        <div className='left-content'>
        <FilterForm />
        </div>
      
      </Box>
    </div>
  );
}
