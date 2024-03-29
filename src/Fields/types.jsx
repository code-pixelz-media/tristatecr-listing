import '../app.css';
import Multiselect from '../Components/multiselect';

export function Types (props) {
  const selectlabel = "Types";
  const TypesOptions = [
    'All',
    'for Lease',
    'for Sale',
    'lease/sale',
    'waiting for approval'
].map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={TypesOptions} selectlabel={selectlabel}/>
    </div>
  );
}
