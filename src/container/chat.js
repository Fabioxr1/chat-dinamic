import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';
import { socketConnect, socketEmitMessage, retriveUrlTabs,socketCountUserOnLine } from '../action';
import TipingChat from '../component/typing';
import Message from './messages';

var server_port = process.env.PORT || 8080;

const socket = io(server_port);
const url = 'http:www.google.it';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {       
            message: '',
            write_message: ''
        };

          socket.on('RECEIVE_MESSAGE', function (data) {
            data.text = ''
            socket.emit('TYPING_MESSAGE_ROOM', data);
        }); // clear timeout typing

        socket.on('TYPING_MESSAGE', function (data) {
            this.setState({ write_message: data });
        }.bind(this));
    }


    componentDidMount() {
        this.props.socketConnect(socket) // test init connection   
        this.props.retriveUrlTabs(socket,url);
        this.props.socketCountUserOnLine(socket)
    }

    uniqueID  = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

    handleSubmit = event => {
        event.preventDefault();
        const message = {
            id: _.uniqueId(this.uniqueID() + '_'),
            author: this.props.chatOption.user,
            message: this.state.message,
            room: this.props.chatOption.room
        }
        this.props.socketEmitMessage(socket, message) // test invio message
        this.setState({ message: '' });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    startMessage = (e) => {
        clearTimeout(this.typingtimeout);
        const data = {
            room: this.props.chatOption.room,
            text: 'Qualcuno sta scrivendo...',
        }
        socket.emit('TYPING_MESSAGE_ROOM', data);
        this.typingtimeout = setTimeout(function () {
            data.text = ''
            socket.emit('TYPING_MESSAGE_ROOM', data);
        }, 3000)
        //if (e.which != 13 || e.keyCode != 13) {}
    }

    render() {
        const chatRoom = this.props.chatOption.room;
        const userOnLine = this.props.chatOption.userConnect;
        const userName = this.props.chatOption.user
        const { message, write_message} = this.state;

        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Socket Chat {chatRoom}</div>
                            <hr />
                            <div className="card-title">User:  {userName}</div>
                            <hr />
                            <div className="btn btn-primary">
                                Utenti Online :  <span className="badge badge-light">{userOnLine}</span>
                            </div>
                            <hr />
                            <Message socket={socket} />
                            <TipingChat write_message={write_message} />
                        </div>
                        <div className="card-footer">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text"
                                    placeholder="Message"
                                    id="message"
                                    className="form-control"
                                    value={message}
                                    onChange={this.handleChange}
                                    onKeyPress={this.startMessage}
                                />
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

function mapStateToProps({ chatOption }) {
    return { chatOption }
}
export default connect(mapStateToProps, { socketConnect, socketEmitMessage, retriveUrlTabs,socketCountUserOnLine })(Chat)