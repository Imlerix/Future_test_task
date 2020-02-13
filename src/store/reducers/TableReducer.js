import * as types from '../../constants/actionTypes'

const initialState = {
    isBigDataSize: true,
    usersRows: [],
    selectedUserRow: {},
    isLoadedRows: false
}


export default function blogReducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_ROWS_FROM_SERVER:
            return {
                ...state,
                usersRows: action.rows,
                isLoadedRows: true,
            }
        case types.SELECT_USER_IN_TABLE:
            return {
                ...state,
                selectedUserRow: action.user,
            }
        case types.ADD_USER_IN_TABLE:
            return {
                ...state,
                usersRows: [action.user, ...state.usersRows],
            }
        case types.SWITCH_DATA_SIZE:
            return {
                ...state,
                isBigDataSize: !state.isBigDataSize,
            }
        case types.SWITCH_DATA_LOADER:
            return {
                ...state,
                isLoadedRows: action.value,
            }

        default:
            return state;
    }
}
