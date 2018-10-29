export const storageMiddleware = (store) => (next) => (action) => {
    if (action.type === 'SOCKET_ADD_USER') {
        next(action);
        if (localStorage['user'] !== JSON.stringify(store.getState().chatOption.user)) {
            localStorage['user'] = JSON.stringify(store.getState().chatOption.user); 
          }       
    }
    if (action.type === 'SOCKET_INSERT_MESSAGE') {
        next(action);
        if (localStorage['message'] !== JSON.stringify(store.getState().chatMessage)) {
            localStorage['message'] = JSON.stringify(store.getState().chatMessage);
          }         
    }
    return next(action);
}