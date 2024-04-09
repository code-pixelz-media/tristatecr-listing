import TextField from '@mui/material/TextField';
import { Component } from 'preact';

class KeyWordSearch extends Component {

    handleKeyWordUpdate = (event) => {
        const keyword = event.target.value;
        this.props.onKeywordChange(keyword);
    }

    render() {
        const { inputplaceholder } = this.props;

        return (
            <TextField id="tristate-input" placeholder={inputplaceholder} onChange={this.handleKeyWordUpdate} />
        );
    }
}

export default KeyWordSearch;
