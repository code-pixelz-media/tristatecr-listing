import Multiselect from '../Components/multiselect';

export function State (props) {
  const selectlabel = "State";
  const StateOptions = [
    'All',
    'NY',
    'NJ'
].map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={StateOptions} selectlabel={selectlabel}/>
    </div>
  );
}
