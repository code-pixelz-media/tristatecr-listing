import Multiselect from '../Components/multiselect';

export function Uses (props) {
  const selectlabel = "Uses";
  const UsesOptions = [
    'All',
    'Community Facility',
    'Flex / Warehouse / Quasi Retail / Light Manufacturing ',
    'Flex/Industrial',
    'Hotel',
    'Industrial/Retail',
    'Industrial/Retail/Office',
    'Industrial/flex',
    'Land',
    'Land ',
    'Medical',
    'Medical/ Creative/ Retail',
    'Mixed Use',
    'Mixed-Use',
    'Mixed-use',
    'Multifamily',
    'Office',
    'Office/Medical',
    'Pad Site/Retail/Medical',
    'Retail',
    'Retail + Community Facility',
    'Retail + Office',
    'Retail + Warehouse',
    'Retail / Medical',
    'Retail/ Restaurant',
    'Retail/Flex',
    'Retail/Restaurant',
    'Storage',
    'Surface Lot ',
    'Warehouse'
].map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={UsesOptions} selectlabel={selectlabel}/>
    </div>
  );
}
