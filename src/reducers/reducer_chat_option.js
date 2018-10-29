import {
    SOCKET_CONNECT,
    SOCKET_ADD_MESSAGE,
    RETRIVE_URL_TABS,
    SOCKET_ADD_USER,
    SOCKET_COUNT_USERS
} from '../action';

const initialState = {
    user : JSON.parse(localStorage.getItem('user'))
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SOCKET_CONNECT:
          //  return { ...state, 'user': action.payload }
           return state;
        case SOCKET_ADD_MESSAGE:
            return { ...state, [action.payload.id]: action.payload }
        case RETRIVE_URL_TABS:
            return { ...state, 'room': action.payload };
        case SOCKET_ADD_USER:
            return { ...state, 'user': action.user };
        case SOCKET_COUNT_USERS:
            return { ...state, 'userConnect': action.payload.count };
        default:
            return state;
    }
}