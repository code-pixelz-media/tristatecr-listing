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
		dropdownOptions: {},
		price: { min: 12000, max: 35000 },
		size: { min: 1500, max: 4500 },
		rent: { min: 15000, max: 45000 },
		googleMapApi: [],
		restApiQuery: ''
	};

	componentDidMount() {
		this.setDropdownOptions();
	}

	componentDidUpdate() {
	
		const { keywordText, dropdownOptions, price, size, rent } = this.state;
	
		// Construct query parameters based on user selections
		const queryParams = [];
		
		// Add keyword text
		if (keywordText.trim() !== '') {
			queryParams.push(`keyword=${encodeURIComponent(keywordText.trim())}`);
		}
	
		// Add selected values from multi-select dropdowns
		MUTIPLE_SELECTS.forEach(label => {
			const selectedValues = dropdownOptions[label.toLowerCase()] || [];
			if (selectedValues.length > 0) {
				const valuesString = selectedValues.map(value => encodeURIComponent(value)).join(',');
				queryParams.push(`${label.toLowerCase()}=${valuesString}`);
			}
		});
	
		// Add price range
		queryParams.push(`min_price=${price.min}`);
		queryParams.push(`max_price=${price.max}`);
	
		// Add size range
		queryParams.push(`min_size=${size.min}`);
		queryParams.push(`max_size=${size.max}`);
	
		// Add rent range
		queryParams.push(`min_rent=${rent.min}`);
		queryParams.push(`max_rent=${rent.max}`);
	
		// Construct the final query string
		const queryString = queryParams.join('&');
	
		// Combine with base URL
		const newRestApiQuery = `${PROPERTIES}?${queryString}`;
		
		// Update the state only if restApiQuery is different
		if (newRestApiQuery !== this.state.restApiQuery) {
			this.setState({ restApiQuery: newRestApiQuery });
		}
	}
	useEffect = (() => {
	console.log('hi');
		// Code here runs before every render
		// Perform operations based on props or state
		// Note: empty dependency array [] ensures this effect runs only once, similar to componentDidMount
	  }, []); 
	  
	setDropdownOptions = () => {
		MUTIPLE_SELECTS.forEach(label => {
			this.fetchDropdownOptions(label);
		});
	}


	fetchDropdownOptions = (label) => {
		const url = this.getDropdownUrl(label);
		if (!url) return;
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(json => {
				if (json.length >= 0) {
					this.setState(prevState => ({
						dropdownOptions: {
							...prevState.dropdownOptions,
							[label]: json
						}
					}));
				}
			})
			.catch(error => {
			
				console.error('Error fetching dropdown options:', error);
				
			});
	}

	getDropdownUrl = (label) => {
		// Define the URL based on the label
		switch (label) {
			case 'Agents':
				return REST_BROKER_URL;
			// Add more cases for other labels as needed
			default:
				return '';
		}
	}

	handleSelectedValues = (fieldName, choices) => {
		// Handle selected values
		// console.log(choices);
		this.setState({ [fieldName]: choices });
	}

	handleKeyWordChange = (event) => {
		this.setState({ keywordText: event.target.value });
	}
	
	handlePriceChange = (min, max) => {
		this.setState({ price: { min, max } });
	}
	
	handleSizeChange = (min, max) => {
		this.setState({ size: { min, max } });
	}
	
	handleRentChange = (min, max) => {
		this.setState({ rent: { min, max } });
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
									dropdownOptions={this.state.dropdownOptions[selectLabel] || []}
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
