import { Component } from 'preact';
import Box from '@mui/material/Box';
import KeyWordSearch from './KeywordSearch';
import MultiSelect from './MultiSelect';
import RangeSelect from './RangeSelect';
import Buttons from './Buttons';
import '../app.css';

const MUTIPLE_SELECTS = ['Agents', 'Uses', 'Types', 'Neighbourhoods', 'Zip codes', 'Cities', 'State', 'Vented'];
const REST_BROKER_URL = 'http://localhost:10019/wp-json/tristatectr/v2/brokers';
const PROPERTIES = 'http://localhost:10019/wp-json/tristatectr/v1/listings';

class SearchFilter extends Component {

	state = {
		keywordText: '',
		agents: [],
		allAgents: [],
		uses: [],
		allUses: [],
		types: [],
		allTypes: [],
		neighbourhoods: [],
		allNeighbourhoods: [],
		zipCodes: [],
		allZipCodes: [],
		allCities: [],
		cities: [],
		state: [],
		allStates: [],
		vented: [],
		allVented: [],
		price: { min: 12000, max: 35000 },
		size: { min: 1500, max: 4500 },
		rent: { min: 15000, max: 45000 },
		googleMapApi: [],
		restApiQuery: ''
	};


	componentDidMount() {
		this.setDropdownOptions();
		
	}

	componentDidUpdate(prevProps) {
		let query = '';
		
	}
	
	setDropdownOptions = () => {

		fetch(`${REST_BROKER_URL}`)
			.then(response => response.json())
			.then(json => {
				if (json.length >= 0) {
					this.setState({ allAgents: json })
				}
			})
			.catch(error => alert(error.message));

	}

	getDropdownObjects = (key) => {

		
	}


	handleSelectedValues = (fieldName, choices) => {
		this.setState({ [fieldName]: choices });
	}

	handleKeyWordChange = (event) => {
		
		console.log(event.target.value);
	}

	render() {

		return (
			<div className='Filterform'>
				<Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
					<div className='left-content'>
						<KeyWordSearch inputplaceholder={'Filter by text ...'} onKeyPress={this.handleKeyWordChange} />
						{
							MUTIPLE_SELECTS.map(selectLabel => (
								<MultiSelect
									key={selectLabel}
									mainLabel={selectLabel}
									dropdownOptions={this.state.}
									handleSelectedValues={selectedValues => this.handleSelectedValues(selectLabel.toLowerCase(), selectedValues)}
								/>
							))
						}

						<RangeSelect mainLabel='Price' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} />
						<RangeSelect mainLabel='Size' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} />
						<RangeSelect mainLabel='Rent' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} />
						<Buttons buttonText={'Save to a new map layer'} />
						<Buttons buttonText={'Clear'} />
					</div>
					<div className='right-content'>
						
					</div>
				</Box>
			</div>
		);
	}
}

export default SearchFilter;