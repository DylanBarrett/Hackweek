const express = require("express");
const router = express.Router();

//Load user model
const Message = require("../../models/message");

// @route   GET api/tutors/gettutors
// @desc    get tutors matching users subject list
// @access  Public
router.get("/getmessages", (req, res) => {
  const user1 = req.query.user1;
  const user2 = req.query.user2;
  // Check Validation
  if (!user1 || !user2) {
    return res.status(400).json({
      error: "No users to find messages."
    });
  }

  Message.find()
    .then(messages => {

      let chats = messages.filter(message => {
        if(message.to === user1 && message.from === user2){
          return true;
        }

        if(message.to === user2 && message.from === user1){
          return true;
        }

        return false;
      });

      if (!chats) {
        return res
          .status(200)
          .json({ error: "No messages between users." });
      } else {
        console.log("chats: ", chats);
        return res.status(200).json({ chats });
      }
    })
    .catch(err => {
      return res
        .status(400)
        .json({ error: "No messages matching input." });
    });
});

router.get("/getInbox", (req, res) => {
  const User = require('../../models/user');
  const user = req.query.user;
  // Check Validation
  if (!user) {
    return res.status(400).json({
      error: "No users to find messages."
    });
  }
  console.log('user: ' + user);
  var promise = new Promise(resolve => {
    Message.find({$or:[{to: user},{from: user}]})
    .then(chats => {
      if (!chats) {
        return res
          .status(200)
          .json({ error: "No chats for this user." });
      } else {

        let chatPartners = [];

        chats.sort( (a,b) => {
          if(a.createdAt < b.createdAt){
            return 1;
          }
          if(a.createdAt > b.createdAt){
            return -1;
          }
          return 0;
        });

        chats.forEach( (c, index) => {
          let found = false;
          if(c.from === user){
            // from requester
            chatPartners.forEach( (partner, index) => {
              if(c.to === partner.targetId){
                found = true;
              }
            });
          } else {
            // from partner
            if(chatPartners !== undefined && chatPartners.length > 0){
              chatPartners.forEach( (partner, index) => {
                if(c.from === partner.targetId){
                  found = true;
                }
              });
            }
          }
          if(!found){
            let targetId = c.from === user ? c.to : c.from;
            let newChat = {
              targetId: targetId,
              from: null,
              latestMessage: c.msg,
              createdAt: c.createdAt
            };

            chatPartners.push(newChat);
            console.log(chatPartners);
          }
        });

        return res.status(200).json({ chatPartners });
      }
    })
    .catch(err => {
      return res
        .status(400)
        .json({ error: "No messages matching input." });
    });
  });

  Promise.all([promise])
    .then(data => {
      console.log("Promise.all data: ", data);
    });

});

module.exports = router;
