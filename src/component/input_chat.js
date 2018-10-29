import React, { Component } from 'react';

class InputChat extends Component {

    constructor(props) {
        super(props);
        this.state = { content: '' };
    }

    onChangeTerm(event) {
        //console.log(event.target.value);
        this.setState({ content: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Input_chat ',this.state.content)
        this.setState({ content: '' })
    }

    render() {
        const { content } = this.state
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <label>
                    Go:
                <textarea
                        //type="textarea"
                        onChange={event => this.onChangeTerm(event)}
                        value={content}
                        className=""
                        placeholder="scrivi..."
                    />
                </label>
                <input type="submit" value="Invia" />
            </form>
        )
    }
}
export default InputChat;