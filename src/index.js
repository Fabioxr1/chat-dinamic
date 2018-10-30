import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { storageMiddleware } from './storage/index';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
//import './index.css';
//import App from './component/App';
import About from './component/about';
import NavBar from './component/navbar';
import registerServiceWorker from './registerServiceWorker';
//import AppSocket from './component/AppSocket';
//import ChatRoom from './component/chatRoomSocket';
import '../src/App.css';
import Chat from './container/chat';


const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const createStoreWhitMiddleware = applyMiddleware(storageMiddleware,thunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWhitMiddleware(rootReducer, reduxDevTools)}>
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Chat} />
                    <Route path="/about" component={About} />
                    {/* <Route path="/chatsocket" component={ChatRoom} /> */}
                    {/* <Route path="/chatsocket" component={Chat} /> */}
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();