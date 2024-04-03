import { h, Component } from 'preact';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

class MultiSelect extends Component {
  render() {
    const { dropdownOptions, mainLabel } = this.props;
   
    const animatedComponents = makeAnimated();
    return (
      <div>
        <label>{ mainLabel }</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={ dropdownOptions }
        />
      </div>

    );
  }
}
export default MultiSelect;
