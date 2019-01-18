import React, { Component } from 'react';
import '../styles/Inbox.css';
import jwt_decode from "jwt-decode";
import { Comment, Header } from 'semantic-ui-react'
import InboxItem from './InboxItem';

class Inbox extends Component {
  constructor(props){
    super(props);

    this.state = {
      inboxList: []
    }
  }

  componentDidMount(){
    let token = localStorage.getItem("userToken");
    let user = jwt_decode(token);
    fetch('https://www.derekrogers.me:3001/api/chat/getInbox?user=' + user.id)
      .then(res => res.json())
      .then(chats => {
        this.setState({inboxList: chats.chatPartners});
      })
      .then(() => {
        let chats = this.state.inboxList;
        chats.forEach((chat, index) => {
          fetch('https://www.derekrogers.me:3001/api/users/getUserById?id=' + chat.targetId)
            .then(res => res.json())
            .then(user => {
              chat.from = user.name;
            })
            .then(() => {
              this.setState({inboxList: chats});
            });
        });
      });
  }

  render(){
    return (
      <div id='inbox'>
        <Comment.Group>
          <Header as='h3' dividing>Inbox</Header>
          {this.state.inboxList ? this.state.inboxList.map((chat, index) => {
            return(
              <InboxItem
                key={index}
                targetId={chat.targetId}
                from={chat.from}
                latestMessage={chat.latestMessage}
                createdAt={chat.createdAt}
              />
            );
          }) : null}
        </Comment.Group>
      </div>
    );
  }
}

export default Inbox;
