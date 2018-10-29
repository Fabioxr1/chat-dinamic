import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socketEmitReciveMessage } from '../action';

class Message extends Component {
    componentDidMount() {
        this.props.socketEmitReciveMessage(this.props.socket)
    }
    render() {
        const messages = this.props.chatMessage;
        return (
            <div className="messages">
                {
                    _.map(messages, message => {
                        return (
                            <div key={message.id}><span className="badge badge-info">{message.author}</span> : {message.message}</div>
                        )
                    })
                }

            </div>
        )
    }
}

function mapStateToProps({ chatMessage }) {
    return { chatMessage }
}

export default connect(mapStateToProps, { socketEmitReciveMessage })(Message)