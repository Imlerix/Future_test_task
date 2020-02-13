import React from 'react';
import style from './style.module.css';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as TableActions from '../../store/actions/TableActions';

import SearchComponent from "../SearchComponent";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableSortLabel from '@material-ui/core/TableSortLabel';

class TableComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rowsPerPage: 10,
            page: 0,
            searchFilter: '',
            order: 'asc',
            orderBy: 'ID',
            headers: [
                { label: 'ID', name: 'id', align: 'left' },
                { label: 'Имя', name: 'firstName', align: 'right' },
                { label: 'Фамилия', name: 'lastName', align: 'right' },
                { label: 'Эл. почта', name: 'email', align: 'right' },
                { label: 'Моб. телефон', name: 'phone', align: 'right' },
            ]
        }
    }
    TableActions = bindActionCreators(TableActions, this.props.dispatch);

    selectUserRow = (event, user) => {
        this.TableActions.selectRow(user);
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: +event.target.value});
        this.setState({page: 0});
    };

    componentDidMount() {
        this.TableActions.getRows(32);
    }

    searchListener = (value) => {
        this.setState({searchFilter: value})
    }

    reFilterFunc = (el, index, array) => {
        if (this.state.searchFilter === '' || this.state.searchFilter === undefined) return el;
        for (let userField in el){
            if (el[userField].toString().toLowerCase().includes(this.state.searchFilter.toLowerCase())) return el;
        } 
    }

    descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    handleRequestSort = (property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        });
    };

    renderTableRow = userRow => (
        <TableRow key={userRow.id}
                  className={style.TableComponent_tableRow}
                  selected={userRow.id === this.props.table.selectedUserRow.id}
                  onClick={event => this.selectUserRow(event, userRow)}>
            <TableCell component="th" scope="row">{userRow.id}</TableCell>
            <TableCell align="right">{userRow.firstName}</TableCell>
            <TableCell align="right">{userRow.lastName}</TableCell>
            <TableCell align="right">{userRow.email}</TableCell>
            <TableCell align="right">{userRow.phone}</TableCell>
        </TableRow>
    )

    renderTableHeadersCell = (el) => (
        <TableCell align={el.align}
                   key={el.name}
                   sortDirection={this.state.orderBy === el.name ? this.state.order : false}>
                    <TableSortLabel
                        active={this.state.orderBy === el.name}
                        direction={this.state.orderBy === el.name ? this.state.order : 'asc'}
                        onClick={e => this.handleRequestSort(el.name)}
                    >
                        {el.label}
                        {this.state.orderBy === el.id ?
                            <span>
                                {this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                            : null
                        }
                    </TableSortLabel>
        </TableCell>
    )

    render() {
        return(
            <Paper className={style.TableComponentContainer}>
                <SearchComponent value={this.state.searchFilter} listener={this.searchListener} />
                <TableContainer>
                    <Table size="small"
                           stickyHeader>
                        <TableHead>
                            <TableRow>
                                {this.state.headers.map(this.renderTableHeadersCell)}
                            </TableRow>
                        </TableHead>
                        {this.props.table.isLoadedRows ?
                            <TableBody>
                                {this.stableSort(this.props.table.usersRows, this.getComparator(this.state.order, this.state.orderBy))
                                    .filter(this.reFilterFunc)
                                    .slice(this.state.page * this.state.rowsPerPage,
                                           this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map(this.renderTableRow)}
                            </TableBody>
                            :
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} />
                                    <TableCell><CircularProgress/></TableCell>
                                    <TableCell colSpan={2} />
                                </TableRow>
                            </TableBody>
                        }
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={this.props.table.usersRows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    table: state.table
})
export default connect(mapStateToProps)(TableComponent);
