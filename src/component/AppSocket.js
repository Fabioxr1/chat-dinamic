/*global chrome*/
import React, { Component } from 'react';
import io from 'socket.io-client';

class AppSocket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            username: '',
            message: '',
            messages: [],
            room: ''
        };

        this.socket = io('http://localhost:5000');
       
        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log('MESSAGGIO', data)
            addMessage(data);
        });

        this.socket.on('connect', function () {
            // Connected, let's sign-up for to receive messages for this room  
        })

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({ message: '' });
        }
    }


    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Socket Chat {this.state.url}</div>
                                <hr />
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <input type="text" placeholder="room" className="form-control" value={this.state.room} onChange={ev => this.setState({ room: ev.target.value })} />
                                <br />
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppSocket