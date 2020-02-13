import React from 'react';
import style from './style.module.css';

import Button from '@material-ui/core/Button';
import DialogComponent from "../DialogComponent";
import {connect} from "react-redux";

class FormComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
    }

    switchDialog = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return(
            <div className={style.FormComponentContainer}>
                <Button onClick={this.switchDialog}
                        disabled={this.state.isOpen || !this.props.table.isLoadedRows}
                        variant="contained"
                        color="primary">
                        Добавить
                </Button>
                <DialogComponent onClose={this.switchDialog}
                                 open={this.state.isOpen}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    table: state.table
})
export default connect(mapStateToProps)(FormComponent);
