import { SOCKET_INSERT_MESSAGE } from '../action';

const initialState = {
 ...JSON.parse(localStorage.getItem('message'))
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SOCKET_INSERT_MESSAGE:
            return { ...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
}