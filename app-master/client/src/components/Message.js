import React, { Component } from 'react';
import '../styles/Message.css';

class Message extends Component {
  render(){
    console.log("Message render!");
    let messageDirection = this.props.messageDirection;
    return (
      <li className={messageDirection + "Message"}>
        <div>
          {this.props.msg}
        </div>
      </li>
    );
  }
}

export default Message;
