import TextField from '@mui/material/TextField';
import { h, Component } from 'preact';

class KeyWordSearch extends Component {

    render() {
      const { inputplaceholder } = this.props;
      
      return (
        <TextField id="tristate-input" placeholder={ inputplaceholder } />
      );
    }
  }
  
  export default KeyWordSearch;