import React from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as TableActions from '../../store/actions/TableActions';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";


class DialogComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAllInputsFull: false,
            fields: [
                {
                    name: 'id',
                    label: 'ID',
                    regExp: /^\d+$/gi,
                    isCorrect: true,
                    hint: 'Только цифры',
                    value: ''
                },
                {
                    name: 'firstName',
                    label: 'Имя',
                    regExp: /^[a-zA-Zа-яА-Я]+$/ig,
                    isCorrect: true,
                    hint: 'Только буквы без пробелов',
                    value: ''
                },
                {
                    name: 'lastName',
                    label: 'Фамилия',
                    regExp: /^[a-zA-Zа-яА-Я]+$/ig,
                    isCorrect: true,
                    hint: 'Только буквы без пробелов',
                    value: ''
                },
                {
                    name: 'email',
                    label: 'Эл. почта',
                    regExp: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gi,
                    isCorrect: true,
                    hint: 'Например: qwerty@gmail.com',
                    value: ''
                },
                {
                    name: 'phone',
                    label: 'Моб. телефон',
                    regExp: /^((\+7|7|8)+([0-9]){10})$/gi,
                    isCorrect: true,
                    hint: 'Например +79991235678 или 89991235678',
                    value: ''
                },
            ]
        }
    }
    TableActions = bindActionCreators(TableActions, this.props.dispatch);

    checkFormFull = (fields) => {
        const countCorrectFields = fields.reduce((sum, curr) => {
            if (curr.isCorrect && curr.value.length > 0) return ++sum;
        }, 0)
        if (countCorrectFields === fields.length){
            this.setState({isAllInputsFull: true});
        }else{
            this.setState({isAllInputsFull: false});
        }
    }

    onChangeForm = (e) => {
        const index = e.target.id;
        const value = e.target.value;
        const name = e.target.name;

        this.setState((state) => {
            if (value.match(state.fields[index].regExp) || value === '' || value === undefined) {
                state.fields[index].isCorrect = true;
                if (name === 'id'){
                    for (let user of this.props.table.usersRows){
                        if (user.id == value) {
                            state.fields[index].isCorrect = false;
                            state.fields[index].hint = 'Такой ID уже существует';
                            break;
                        }else{
                            state.fields[index].isCorrect = true;
                            state.fields[index].hint = 'Только цифры';
                        }
                    }
                }
            }else{
                state.fields[index].isCorrect = false;
            }
            state.fields[index].value = value;

            this.checkFormFull(state.fields);
            return state;
        });
    }

    handleSave = () => {
        const userObj = this.state.fields.reduce((summaryObj, field) => {
            summaryObj[field.name] = field.value;
            return summaryObj;
        }, {})
        this.setState((state) => {
            state.fields = state.fields.map(field => {
                field.value = '';
                return field;
            })
            return state;
        })

        this.TableActions.addUserInTable(userObj);
        this.handleClose();
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const {
            open
        } = this.props;

        return(
            <Dialog onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"
                    open={open}>
                    <DialogTitle>Добавить нового пользователя</DialogTitle>
                    <List>
                        {this.state.fields.map((field, index) => (
                            <ListItem key={index}>
                                <TextField fullWidth
                                           error={!field.isCorrect}
                                           onChange={this.onChangeForm}
                                           helperText={field.hint}
                                           id={index}
                                           name={field.name}
                                           value={field.value}
                                           label={field.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Tooltip disableHoverListener={this.state.isAllInputsFull}
                             title="Сначала заполните поля!"
                             style={{width: '100%'}}
                             aria-label="save">
                        <div style={{width: '100%'}}>
                        <Button variant="contained"
                                fullWidth
                                onClick={this.handleSave}
                                disabled={!this.state.isAllInputsFull}
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}>
                                Добавить в таблицу
                        </Button>
                        </div>
                    </Tooltip>
            </Dialog>
        )
    }
}

DialogComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    table: state.table
})
export default connect(mapStateToProps)(DialogComponent);
