/*global chrome*/
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_ADD_MESSAGE = 'SOCKET_ADD_MESSAGE';
export const RETRIVE_URL_TABS = 'RETRIVE_URL_TABS';
export const SOCKET_ADD_USER = 'SOCKET_ADD_USER';
export const SOCKET_INSERT_MESSAGE = 'SOCKET_INSERT_MESSAGE';
export const SOCKET_COUNT_USERS = 'SOCKET_COUNT_USERS';

export function socketConnect(socket) {
    return (dispatch) => {
        socket.on('connect', function () {
            //console.log(socket.id)
            dispatch({
                type: SOCKET_CONNECT,
                payload: socket.id
            })
        })
    }
}

export function socketCountUserOnLine(socket) {
    return (dispatch) => {
        socket.on('SOCKET_COUNTER', function (res) {
            dispatch({
                type: SOCKET_COUNT_USERS,
                payload: res
            })
        })
    }
}

export function socketEmitMessage(socket, data) {
    socket.emit('SEND_MESSAGE_ROOM', data);
    return (dispatch) => {
        dispatch({
            type: SOCKET_ADD_MESSAGE,
            payload: data
        })
    }
}

export function socketSetUser(user) {
    return (dispatch) => {
        dispatch({
            type: SOCKET_ADD_USER,
            user
        })
    }
}

export function socketEmitReciveMessage(socket) {
    return (dispatch) => {
        socket.on('RECEIVE_MESSAGE', function (res) {
            dispatch({
                type: SOCKET_INSERT_MESSAGE,
                payload: res
            })
        });
    }
}


export function retriveUrlTabsBuild(socket) {
    if(!chrome.tabs){
        socket.emit('CHANGE_ROOM', 'room production');
        return (dispatch) => {
            dispatch({
                type: RETRIVE_URL_TABS,
                payload: 'room production'
            })
        }
    }
    return (dispatch) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            socket.emit('CHANGE_ROOM', tabs[0].url);
            dispatch({
                type: RETRIVE_URL_TABS,
                payload: tabs[0].url
            })
        })
    }
}
//retriveUrlTabsBuild action finale

export function retriveUrlTabsBuilds(socket) {
    socket.emit('CHANGE_ROOM', 'room production');
    return (dispatch) => {
        dispatch({
            type: RETRIVE_URL_TABS,
            payload: 'room production'
        })
    }
}