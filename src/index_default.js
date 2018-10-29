import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
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
const createStoreWhitMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWhitMiddleware(rootReducer, reduxDevTools)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Chat} />
                    <Route path="/about" component={About} />
                    {/* <Route path="/chatsocket" component={ChatRoom} /> */}
                    {/* <Route path="/chatsocket" component={Chat} /> */}
                </Switch>
                <NavBar />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();