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
            <Toolbar className={style.SearchComponentContainer}>
                <TextField onChange={this.onChangeInput}
                           value={this.props.value}
                           label="Поиск"/>
            </Toolbar>
        )
    }
}

SearchComponent.propTypes = {
    value: PropTypes.string.isRequired,
    listener: PropTypes.func.isRequired,
};

export default SearchComponent;
