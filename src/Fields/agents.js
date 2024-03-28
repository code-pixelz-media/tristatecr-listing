import '../app.css';
import Multiselect from '../Components/multiselect';

export function Agents (props) {
  const selectlabel = "Agents";
  const AgentsOptions = [
    'All',
    'Avi Akiva',
    'Avrum Deutsch',
    'Chandler Slate',
    'Dov Bleich',
    'Duvy Biller',
    'Eddie Keda',
    'Ely Akiva',
    'Fred Betesh',
    'Freddy Bagdadi',
    'Fredy Halabi',
    'Harry Bouzaglou',
    'Hindy German',
    'Jack Sardar',
    'Jacob Twena',
    'Joey Bouzaglou',
    'Joey Sakkal',
    'Joseph Cohen',
    'Kevin Healey',
    'Kirill Galperin',
    'Leo Beda',
    'Mendel Jacobson',
    'Mendel Sears',
    'Michael Elkharrat',
    'Morris Mishan',
    'Moshe Akiva',
    'Richard Babeck',
    'Robert Mitchell',
    'Samuel Shouela',
    'Sherry Chera',
    'Shlomi Bagdadi',
    'Steve Jeffries',
    'Victoria Amador',
    'Zack Setton'
]
.map(option => ({ value: option.toLowerCase(), label: option }));

  return (
    <div className=''>
      <Multiselect colourOptions={AgentsOptions} selectlabel={selectlabel} />
    </div>
  );
}
