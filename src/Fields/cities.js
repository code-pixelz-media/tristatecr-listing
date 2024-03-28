import '../app.css';
import Multiselect from '../Components/multiselect';

export function Cities (props) {
  const selectlabel = "Cities";
  const CitiesOptions = [
    'All',
    'Amityville',
    'Astoria',
    'Bala Cynwyd',
    'Bronx',
    'Brooklyn',
    'Brooklyn ',
    'Chicago',
    'Coatesville',
    'Elverson',
    'Far Rockaway',
    'Farmingville',
    'Harleysville ',
    'Jersey City',
    'Malvern',
    'Malvern ',
    'Maple Shade',
    'Marcus Hook ',
    'Montgomeryville',
    'New York',
    'Paoli',
    'Perkasie',
    'Philadelphia',
    'Philadelphia ',
    'Phoenixville',
    'Queens',
    'Ridgewood',
    'Staten Island',
    'Swedesboro',
    'Union City',
    'Villanova',
    'Warminster',
    'West Chester',
    'West New York',
    'Yonkers'
]
.map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={CitiesOptions} selectlabel={selectlabel}/>
    </div>
  );
}
