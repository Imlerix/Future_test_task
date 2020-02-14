import React from 'react';
import style from './style.module.css';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as TableActions from '../../store/actions/TableActions';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export class DetailInfoComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    TableActions = bindActionCreators(TableActions, this.props.dispatch);

    hideUser = () => {
        this.TableActions.selectRow({})
    }

    render() {
        const user = this.props.table.selectedUserRow.id ? this.props.table.selectedUserRow : null;

        return(
            <div className={style.DetailInfoComponentContainer}>
                {user ?
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Выбран пользователь: {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Описание: </b>{user.description || 'Не указано'}
                                <br/>
                                <br/>
                                <b>Адрес проживания: </b>{user.address ? user.address.streetAddress : 'Не указано'}
                                <br/>
                                <b>Город: </b>{user.address ? user.address.city : 'Не указано'}
                                <br/>
                                <b>Провинция/штат: </b>{user.address ? user.address.state : 'Не указано'}
                                <br/>
                                <b>Индекс: </b>{user.address ? user.address.zip : 'Не указано'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.hideUser}
                                    size="small"
                                    color="primary">
                                    Скрыть детальную информацию
                            </Button>
                        </CardActions>
                    </Card>
                    :
                    <Card className={style.DetailInfoComponentNotLoaded}>
                        {this.props.table.isLoadedRows ?
                            <span>Выберите пользователя для просмотра детальной информации</span>
                            :
                            <span>Идёт загрузка списка...</span>
                        }
                    </Card>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    table: state.table
})
export default connect(mapStateToProps)(DetailInfoComponent);
