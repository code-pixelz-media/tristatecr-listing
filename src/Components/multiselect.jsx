import { Component } from 'preact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';



class MultiSelect extends Component {

  render() {
    const { dropdownOptions, mainLabel , handleSelectedValues } = this.props;
    return (
      <div>
        <label>{ mainLabel }</label>
        <Select
          closeMenuOnSelect={false}
          components={ makeAnimated() }
          isMulti
          options={ dropdownOptions }
          onChange={ handleSelectedValues }
        /> 
      </div>

    );
  }
}
export default MultiSelect;
