import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleInput = (input) => {
    const content = input.trim();
    if (content.length === 0) {
      return;
    }
    this.setState((prevState) => ({
      messages: prevState.messages.concat({
        text: content,
        role: 'CUSTOMER',
      }),
    }));
    const autoMessage = answersData.find((answer) => {
      for (let i = 0; i < answer.tags.length; i += 1) {
        if (content.indexOf(answer.tags[i]) !== -1) {
          return true;
        }
      }
      return false;
    });
    if (autoMessage) {
      setTimeout(() => {
        this.setState((prevState) => ({ messages: prevState.messages.concat(autoMessage) }));
      }, 500);
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleInput={this.handleInput} />
      </main>
    );
  }
}

export default Chat;
