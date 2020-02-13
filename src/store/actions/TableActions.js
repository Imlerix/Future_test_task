import * as types from '../../constants/actionTypes';
import axios from 'axios'
const url = `${process.env.REACT_APP_SERVERURL}`;

export function getRows(dataSize = 32) {
    return (dispatch, getState) => {

        const params = {
            rows: dataSize,
            id: '{number|1000}',
            firstName: '{firstName}',
            lastName: '{lastName}',
            email: '{email}',
            phone: '{phone|(xxx)xxx-xx-xx}',
            address: '{addressObject}',
            description: '{lorem|32}',
        }
        if (dataSize > 32) params.delay = 3;

        axios.get(url, { params })
            .then(res => {
                let data = {
                    type: types.GET_ROWS_FROM_SERVER,
                    rows: res.data,
                }

                dispatch(data);
            })
            .catch(err => {
                dispatch([])
                console.error(err)
            })
    }
}

export function selectRow(userObj) {
    return {
        type: types.SELECT_USER_IN_TABLE,
        user: userObj
    }
}

export function addUserInTable(userObj) {
    return {
        type: types.ADD_USER_IN_TABLE,
        user: userObj
    }
}
