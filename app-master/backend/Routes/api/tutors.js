const express = require("express");
const router = express.Router();

//Load user model
const User = require("../../models/user");

// @route   POST api/tutors/subjects
// @desc    get subjects from user to populate tutor list
// @access  Public
router.post("/:id/subjects", (req, res) => {
  const { id } = req.params;
  // Check Validation
  if (!id) {
    return res.status(400).json({
      error: "You need to set up your profile before finding tutors."
    });
  }
  User.findOne({ _id: id })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login before finding tutors." });
      } else {
        const subjects = user.subjects;
        return res.status(200).json({ subjects });
      }
    })
    .catch(err => {
      return res
        .status(400)
        .json({ error: "Couldn't find user profile to populate tutor list." });
    });
});

// @route   POST api/tutors/gettutors
// @desc    get tutors matching users subject list
// @access  Public
router.get("/gettutors", (req, res) => {
  const subjects = JSON.parse(req.query.subjects);
  // Check Validation
  if (!subjects) {
    return res.status(400).json({
      error: "No subjects to find tutors."
    });
  }
  User.find({ userType: "tutor" })
    .then(users => {
      let tutors = users.filter(user => {
        for (let i = 0; i < user.subjects.length; i++) {
          if (subjects.includes(user.subjects[i])) {
            return true;
          } else {
            return false;
          }
        }
      });

      if (!tutors) {
        return res
          .status(200)
          .json({ error: "No tutors matching your subject list." });
      } else {
        return res.status(200).json({ tutors });
      }
    })
    .catch(err => {
      return res
        .status(400)
        .json({ error: "No tutors matching your subject list." });
    });
});

module.exports = router;
