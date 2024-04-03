import { Component  } from 'preact';
import Box from '@mui/material/Box';
import KeyWordSearch from './KeywordSearch';
import MultiSelect from './MultiSelect';
import RangeSelect from './RangeSelect';
import Buttons from './Buttons';
import '../app.css';


class SearchFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keywordText: '',
      agents: [],
      uses: [],
      types: [],
      neighbourhoods: [],
      zipCodes: [],
      cities: [],
      state: [],
      vented: [],
      price: { min: 12000, max: 35000 },
      size: { min: 1500, max: 4500 }, 
      rent: { min: 15000, max: 45000 },
    };
  }
  
  render() {
  
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
      <div className='Filterform'>
        <Box  sx={{ display: 'flex' , flexDirection: 'column' , m: 1}}>
        <div className='left-content'>
            <KeyWordSearch inputplaceholder={ 'Filter by text ...' }/>
            <MultiSelect mainLabel='Agents' dropdownOptions={ options }  />
            <MultiSelect mainLabel='Uses' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='Types' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='Neighbourhoods' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='Zip codes' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='Cities' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='State' dropdownOptions={ options }  /> 
            <MultiSelect mainLabel='Vented' dropdownOptions={ options }  /> 
            <RangeSelect mainLabel='Price' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417 , 215292]} />
            <RangeSelect mainLabel='Size' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417 , 215292]} />
            <RangeSelect mainLabel='Rent' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417 , 215292]} />
            <Buttons buttonText={'Save to a new map layer'}/>
            <Buttons buttonText={'Clear'}/>
        </div>
        <div className='right-content'>
        
        </div>
        </Box>
      </div>
    );
  }
}

export default SearchFilter;