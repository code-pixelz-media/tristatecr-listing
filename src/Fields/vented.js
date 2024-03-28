import '../app.css';
import Multiselect from '../Components/multiselect';

export function Vented (props) {
  const selectlabel = "Vented";
  const VentedOptions = [
    'All',
    'CAN BE',
    'N0',
    'YES'
].map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={VentedOptions} selectlabel={selectlabel}/>
    </div>
  );
}
