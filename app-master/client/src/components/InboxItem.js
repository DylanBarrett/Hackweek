import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import '../styles/InboxItem.css';

class InboxItem extends Component {
  render(){
    let now = new Date(parseInt((new Date()).getTime()));
    let date = new Date(parseInt(this.props.createdAt));

    // if message was not sent today, format to MM/DD/YYYY
    let formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    // if message was sent today, format to HH:MMam/pm
    if(date.getMonth() === now.getMonth() && date.getDate() === now.getDate() && date.getFullYear() === now.getFullYear()){
      let hours = date.getHours();
      let amPm = 'am';

      if(hours > 11){
        hours = hours % 12;
        amPm = 'pm';
      }
      if(hours === 0){
        hours = 12;
        amPm = 'am';
      }

      formattedDate = hours + ':' + date.getMinutes().toString().padStart(2, '0') + amPm;
    }
    return(
      <Link to={'/chat/' + this.props.targetId}>
        <Comment id="inboxItem">
          <Comment.Avatar src='./avatar.png'/>
          <Comment.Content>
            <Comment.Author as='span'>{this.props.from}</Comment.Author>
            <Comment.Metadata>{formattedDate}</Comment.Metadata>
            <Comment.Text>{this.props.latestMessage}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Link>
    );
  }
}

export default InboxItem;
