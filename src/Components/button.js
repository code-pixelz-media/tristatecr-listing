import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function TristateButton(props) {
  const { buttontext } = props;
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      
      <div>
        <Button variant="contained" size="medium"> {buttontext} </Button> 
      </div>
    </Box>
  );
}