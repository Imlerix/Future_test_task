import React from 'react';
import style from './style.module.css';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as TableActions from '../../store/actions/TableActions';

import Switch from "@material-ui/core/Switch";

class SwitcherDataSize extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    TableActions = bindActionCreators(TableActions, this.props.dispatch);

    switchDataSize = () => {
        this.TableActions.switchDataSize();
    }

    render() {
        return(
            <div className={style.SwitcherDataSizeContainer}>
                <span>
                    Переключить объём данных
                </span>
                <Switch
                    checked={this.props.table.isBigDataSize}
                    onChange={this.switchDataSize}
                    disabled={!this.props.table.isLoadedRows}
                    value="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    table: state.table
})
export default connect(mapStateToProps)(SwitcherDataSize);
