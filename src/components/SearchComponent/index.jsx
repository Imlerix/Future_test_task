import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

class SearchComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    onChangeInput = (e) => {
        const value = e.target.value;
        this.props.listener(value);
    }

    render() {
        return(
            <div>
                <TextField onChange={this.onChangeInput}
                           disabled={this.props.disabled}
                           value={this.props.value}
                           label="Поиск"/>
            </div>
        )
    }
}

SearchComponent.propTypes = {
    value: PropTypes.string.isRequired,
    listener: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default SearchComponent;
