import { PropertyListingComp } from '../Components/PropertyListingComp';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
export function PropertyListing(props) {

  return (
    <div className='property-list-wrapper'>
    <Box>
      <Stack spacing={{ xs: 1, sm: 3 }} direction="row" useFlexGap >
      <PropertyListingComp />
      <PropertyListingComp />
      <PropertyListingComp />
      </Stack>
    </Box>
    </div>
  );
}
