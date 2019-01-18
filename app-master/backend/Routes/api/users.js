const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.js");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/user");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        gradeLevel: req.body.gradeLevel,
        userType: req.body.userType,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login user / Return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          name: user.name,
          gradeLevel: user.gradeLevel,
          userType: user.userType,
          subjects: user.subjects
        }; // Create JWT payload

        // Sign Token
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   PUT api/profile
// @desc    Add profile
// @access  Public
router.put("/profile", (req, res) => {
  const { subjects, id } = req.body;
  let error = "";

  if (!subjects.length) {
    return res
      .status(400)
      .json({ error: "Please select at least one subject." });
  }
  if (!id) {
    return res.status(400).json({ error: "Please re-login." });
  }

  User.findByIdAndUpdate(id, { subjects })
    .then(user => {
      if (!user) {
        error = "User not found";
        return res.status(404).json(error);
      }

      user
        .save()
        .then(created => res.status(201).json(created))
        .catch(err => console.log(err));
    })
    .catch(err => {
      return res.status(400).json({ error: "Didn't update" });
    });
});

router.get("/getUserById", (req, res) => {
  // fetch usernames from Users collection
  console.log("id: " + req.query.id);
  let targetId = req.query.id;
  User.findById(targetId)
    .then( user => {
        res.status(200).json({name: user.name});
    })
    .catch(err => {
      res.status(400).json({error: 'no user found'});
    });
});


module.exports = router;
