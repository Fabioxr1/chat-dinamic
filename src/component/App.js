/*global chrome*/
import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
//import "../src/js/popup";
import firebase from '../firebase.js';
import ListMessage from '../component/list-message';
import moment from 'moment';
//https://github.com/tshaddix/react-chrome-redux
//https://codeburst.io/isomorphic-web-app-react-js-express-socket-io-e2f03a469cd3
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'chrome://extensions/', // mai vuoto per firebase
      username: '',
      CurrentMessage: '',
      dateinsert: '',
      listMessage: []
    };
  }

  componentDidMount() {
   //this.retriveUrlTabs();
    this.retriveListMessage();
  }
  
  retriveUrlTabs() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const url = tabs[0].url;
      this.setState({ url })
      this.retriveListMessage();
    }.bind(this))
  }

  retriveListMessage() {
    const url = this.state.url;
    const itemsRef = firebase.database().ref(btoa(url));
    //const itemsRef = firebase.database().ref(url.toString());
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          CurrentMessage: items[item].CurrentMessage,
          user: items[item].user,
          dateinsert: items[item].dateinsert
        });
      }
      this.setState({
        listMessage: newState
      });
    });
  }


  onChangeTerm(event) {
    this.setState({ CurrentMessage: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.setUsernameLocal();
    const { url, username, CurrentMessage } = this.state
    const messageRef = firebase.database().ref(btoa(url)); // atob(encodedString);
   // const messageRef = firebase.database().ref(url.toString()); // atob(encodedString);
    const MessageSave = {
      CurrentMessage: CurrentMessage,
      user: username,
      url: url,
      dateinsert: this.setMomentdate()
    }
    messageRef.push(MessageSave);
    this.setState({ CurrentMessage: '' })
  }

  onSetName(event) {
    this.setState({ username: event.target.value })
  }

  setMomentdate() {
    moment.locale('it')
    var currentDate = moment();
    return currentDate.format('LLL');
  }

  // setUsernameLocal() {
  //   const key = 'user-chat-value';
  //   const value = this.state.username;
  //   chrome.storage.sync.set({ key: value }, function () {
  //     this.setState({ username: value });
  //   }.bind(this));
  // }

  render() {
    const { url, CurrentMessage, listMessage, username } = this.state
    return (
      <div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Chat {url}</div>
                  <hr />
                  <div className="messages">
                    <ListMessage listMessage={listMessage} />
                  </div>
                </div>
                <div className="card-footer">
                  <form onSubmit={event => this.handleSubmit(event)}>
                    <input className="form-control input-set" type="text" onChange={event => this.onSetName(event)} value={username} placeholder="scegli un nome utente" />
                    <input
                      type="text"
                      onChange={event => this.onChangeTerm(event)}
                      value={CurrentMessage}
                      className="form-control input-set"
                      placeholder="scrivi..."
                    />
                    <input className="btn btn-primary form-control" type="submit" value="Invia" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>  
    );
  }
}

export default App;