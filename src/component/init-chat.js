import React, {Component} from 'react';

class InitApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { username: '' };
  
      // Bind 'this' to event handlers. React ES6 does not do this by default
      this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
      this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    }
  
    usernameChangeHandler(event) {
      this.setState({ username: event.target.value });
    }
  
    usernameSubmitHandler(event) {
      event.preventDefault();
      this.setState({ submitted: true, username: this.state.username });
    }
  
    render() {
      if (this.state.submitted) {
        // Form was submitted, now show the main App
        return (
          <div></div>
        );
      }
  
      // Initial page load, show a simple login form
      return (
        <form onSubmit={this.usernameSubmitHandler} className="username-container">
          <h1>React Instant Chat</h1>
          <div>
            <input
              type="text"
              onChange={this.usernameChangeHandler}
              placeholder="Enter a username..."
              required />
          </div>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  
  }
  
  export default InitApp;