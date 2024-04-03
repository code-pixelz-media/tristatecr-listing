import { h, Component  } from 'preact';
import { Box , Slider} from '@mui/material';

class RangeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultSelectedValue
    };
  }

  valuetext(value) {
    return `${value}`;
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    const { mainLabel , initialMinValue ,initialMaxValue } = this.props;

    return (
    <div>
      <Box sx={{ width: 100+'%' }}>
        <label>{ mainLabel }</label>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={this.valuetext}
          min={0}
          max={400000}
        />
      </Box>
      <div className='price-range-btm'>
        <span>{initialMinValue}</span>
        <span>{initialMaxValue}</span>
      </div>
    </div>
    );
  }
}

export default RangeSelect;