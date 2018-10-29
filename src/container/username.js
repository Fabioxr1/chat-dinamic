import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socketSetUser } from '../action';

class UserName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }
    componentDidMount() {
        if (this.props.chatOption.user) {
            this.setState({ username: this.props.chatOption.user })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.socketSetUser(this.state.username);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        const { username } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-1">Scegli Nome</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ chatOption }) {
    return { chatOption }
}

export default connect(mapStateToProps, { socketSetUser })(UserName)




    // < p > Scegli un nome utente</p >
    //     <form onSubmit={this.handleSubmit}>
    //         <input type="text" id="username" placeholder="Username" value={username} onChange={this.handleChange} className="form-control" />
    //         <br />
    //         <button className="btn btn-primary form-control">Invia</button>
    //     </form>