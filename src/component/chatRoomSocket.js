/*global chrome*/
import React, { Component } from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.google.it',
            username: '',
            message: '',
            messages: []
        };
    }
    componentDidMount() {
        this.socket = io('http://localhost:5000');
       // this.retriveUrlTabs();
        this.socket.on('connect', function () {
            console.log('user connect')
        });

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            this.addMessage(data);
        }.bind(this));
    }

    addMessage = data => {
        this.setState({ messages: [...this.state.messages, data] });
    };


    handleSubmit = event => {
        event.preventDefault();
        this.socket.emit('SEND_MESSAGE_ROOM', {
            id: _.uniqueId('message_'),
            author: this.state.username,
            message: this.state.message,
            room : this.state.url
        })
        this.setState({ message: '' });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    

    retriveUrlTabs = () =>  {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const url = tabs[0].url;
            this.setState({ url })
            this.socket.emit('CHANGE_ROOM',url);
        }.bind(this))
    }
    render() {

        const { url, username, message, messages } = this.state;
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Socket Chat {url}</div>
                            <hr />
                            <div className="messages">
                                {messages.map(message => {
                                    return (
                                        <div key={message.id}>{message.author}: {message.message}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="card-footer">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" id="username" placeholder="Username" value={username} onChange={this.handleChange} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" id="message" className="form-control" value={message} onChange={this.handleChange} />
                                <br />
                                <button className="btn btn-primary form-control">Invia</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatRoom;