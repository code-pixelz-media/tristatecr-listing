import Multiselect from '../Components/multiselect';

export function Zipcode (props) {
  const selectlabel = "Zip Codes";
  const ZipcodeOptions = [
    'All',
    '10001',
    '10002',
    '10003',
    '10009',
    '10011',
    '10013',
    '10014',
    '10016',
    '10018',
    '10019',
    '10022',
    '10023',
    '10024',
    '10025',
    '10027',
    '10028',
    '10029',
    '10030',
    '10031',
    '10032',
    '10033',
    '10035',
    '10036',
    '10038',
    '10065',
    '10128',
    '10314',
    '10451',
    '10452',
    '10453',
    '10454',
    '10455',
    '10456',
    '10457',
    '10458',
    '10459',
    '10460',
    '10467',
    '10468',
    '10470',
    '10474',
    '10701',
    '11101',
    '11102',
    '11106',
    '11201',
    '11203',
    '11205',
    '11206',
    '11207',
    '11208',
    '11210',
    '11211',
    '11212',
    '11213',
    '11214',
    '11215',
    '11216',
    '11217',
    '11218',
    '11219',
    '11220',
    '11221',
    '11222',
    '11223',
    '11224',
    '11225',
    '11226',
    '11228',
    '11229',
    '11230',
    '11231',
    '11232',
    '11233',
    '11234',
    '11235',
    '11236',
    '11237',
    '11238',
    '11239',
    '11249',
    '11367',
    '11368',
    '11378',
    '11379',
    '11385',
    '11414',
    '11415',
    '11416',
    '11418',
    '11432',
    '11434',
    '11435',
    '11694',
    '11701',
    '11738',
    '16460',
    '18936',
    '18944',
    '18974',
    '19004',
    '19085',
    '19102',
    '19103',
    '19104',
    '19106',
    '19107',
    '19114',
    '19118',
    '19119',
    '19121',
    '19122',
    '19123',
    '19124',
    '19125',
    '19128',
    '19130',
    '19131',
    '19133',
    '19138',
    '19139',
    '19140',
    '19143',
    '19144',
    '19146',
    '19147',
    '19148',
    '19151',
    '19301',
    '19335',
    '19380',
    '19382',
    '19434',
    '19460',
    '19520',
    '19601',
    '8052',
    '8085'
]
.map(option => ({ value: option.toLowerCase(), label: option }));


  return (
    <div className=''>
      <Multiselect colourOptions={ZipcodeOptions} selectlabel={selectlabel}/>
    </div>
  );
}
