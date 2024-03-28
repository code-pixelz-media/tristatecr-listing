import { useState } from 'preact/hooks';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function Multiselect(props) {
  const { colourOptions } = props;
  const animatedComponents = makeAnimated();

  return (
    <>
      <label>Agent</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={colourOptions}
      />
    </>
  );
}
