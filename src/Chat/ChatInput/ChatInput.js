import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
    };
  }

  handleChange = (event) => {
    this.setState({ chatInput: event.target.value });
  };

  handleClick = () => {
    this.props.handleInput(this.state.chatInput);
    this.setState({ chatInput: '' });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onChange={this.handleChange} value={this.state.chatInput} />
        <button type="button" onClick={this.handleClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
