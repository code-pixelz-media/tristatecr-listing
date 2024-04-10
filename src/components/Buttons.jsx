import { Component  } from 'preact';
import { Box , Button } from '@mui/material';

class Buttons extends Component {

    render() {
        const { buttonText } = this.props;
        
        return (
            <Box sx={{ '& button': { m: 1 } }}>
                <div>
                    <Button variant="contained" size="medium" > { buttonText } </Button>
                </div>
            </Box> 
        );
      }


}

export default Buttons;