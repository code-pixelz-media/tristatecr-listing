import TextField from '@mui/material/TextField';

function InputTextField(props) {
  const { inputplaceholder } = props;

  return (
    <TextField id="tristate-input" placeholder={inputplaceholder} />
  );
}

export default InputTextField;
