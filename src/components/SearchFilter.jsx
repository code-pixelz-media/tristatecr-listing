import { Component } from 'preact';
import Box from '@mui/material/Box';
import KeyWordSearch from './KeywordSearch';
import MultiSelect from './MultiSelect';
import RangeSelect from './RangeSelect';
import Buttons from './Buttons';
import '../app.css';

const MUTIPLE_SELECTS = ['Agents', 'Uses', 'Types', 'Neighbourhoods', 'Zip codes', 'Cities', 'State', 'Vented'];
const BASE_URL = 'http://localhost:10019/wp-json/tristatectr/v1/listings';
const REST_BROKER_URL = 'http://localhost:10019/wp-json/tristatectr/v2/brokers';
class SearchFilter extends Component {
    state = {
        keyWord: '',
        agents: [],
        uses: [],
        types: [],
        neighbourhoods: [],
        zipCodes: [],
        cities: [],
        states: [],
        vented: [],
        dropdownOptions: {},
        price: { min: 12000, max: 35000 },
        size: { min: 1500, max: 4500 },
        rent: { min: 15000, max: 45000 },
        googleMapApi: [],
        restApiQuery: null,
        multiSelect : {},
        properties : {},
    };
    
	componentDidMount() {
    
		if (this.state.restApiQuery !== null) {
			this.constructApiUrl();
		}
		MUTIPLE_SELECTS.forEach(label => {
				this.fetchDropdownOptions(label);
			
		});
		
    }    
    resetState = () => {
		this.setState({
			keyWord: '',
			price: { min: 12000, max: 35000 },
			size: { min: 1500, max: 4500 },
			rent: { min: 15000, max: 45000 },
			restApiQuery: null
		}, this.constructApiUrl);
	}

    constructApiUrl = () => {
        const { keyWord, price, size, rent , agents } = this.state;
        const agentIds = agents.map(agent => agent.value);
        const queryParams = new URLSearchParams({
            keyword: keyWord,
            agents : agentIds.join(','),
            minPrice: price.min,
            maxPrice: price.max,
            minSize: size.min,
            maxSize: size.max,
            minRent: rent.min,
            maxRent: rent.max
        });
        const apiUrl = `${BASE_URL}?${queryParams}`;
        this.setState({ restApiQuery: apiUrl });
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
	fetchRemote =(url , state) => {
		
		if(!url) return;
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(json => {
				if (json.length >= 0) {
					// this.setState(properties : json )
				}
			})
			.catch(error => {
			
				console.error('Error occured', error);
				
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


    handleKeywordChange = (keyword) => {
        this.setState({ keyWord: keyword }, this.constructApiUrl);
    }

    handlePriceChange = (min, max) => {
        this.setState({ price: { min, max } }, this.constructApiUrl);
    }

    handleSizeChange = (min, max) => {
        this.setState({ size: { min, max } }, this.constructApiUrl);
    }

    handleRentChange = (min, max) => {
        this.setState({ rent: { min, max } }, this.constructApiUrl);
    }
    
    
	handleSelectedValues = (fieldName, choices) => {
		this.setState({ [fieldName]: choices }, this.constructApiUrl);
		
		
	}

    render() {
   
		
		const options = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' }
		  ]
        return (
            <div className='Filterform'>
                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                    <div className='left-content'>
                        <KeyWordSearch inputplaceholder={'Filter by text ...'} onKeywordChange={this.handleKeywordChange} />
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
						<RangeSelect mainLabel='Price' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} onChange={this.handlePriceChange} />
						<RangeSelect mainLabel='Size' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} onChange = {this.handleSizeChange}/>
						<RangeSelect mainLabel='Rent' initialMinValue={0} initialMaxValue={400000} defaultSelectedValue={[98417, 215292]} onChange = {this.handleSizeChange} />
                        <Buttons buttonText={'Save to a new map layer'} />
                        <Buttons buttonText={'Clear'} onClick={this.resetState}/>
                    </div>
                    <div className='right-content'>
                        {/* Additional content can be added here */}
                    </div>
                </Box>
            </div>
        );
    }
}

export default SearchFilter;

