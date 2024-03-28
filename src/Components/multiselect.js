import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Multiselect(props) {
  const { colourOptions } = props;
  const { selectlabel } = props;
  const animatedComponents = makeAnimated();

  return (
    <>
      <label>{selectlabel}</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={colourOptions}
      />
    </>
  );
}
