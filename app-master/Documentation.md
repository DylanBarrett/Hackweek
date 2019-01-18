# Hack Week Project Documentation

## Introduction

### Group Intro

Group name: Group Undecided

GitHub repo: https://www.github.com/Hack-Week-Project/app

Running instance: https://www.derekrogers.me

Members:
* Dylan Barrett
* Alec Richardson
* Derek Rogers

### Project Intro

#### What we worked on:

Application that brings students and tutor, during signup the user will select whether they are a student or tutor, if they select tutor, they choose the subject they cover so that the students can select from a list that teach that subject.

## The Problem

Finding a tutor or learning center can be very costly and time consuming to find the one right for you. We are set out to make an easy to use app that brings together tutors and students for free.

## Our Solution

We decided to build a web app that has users signup as either a tutor or student then once the signup process is done, the student can find a list of tutors that teach the subject they are looking for help in. Then once the student has the list of tutors, they can choose one and start a chat with them to get help and answer their questions


## Implementation

We used express for the backend, mongoDB to hold our data, socket.io for our web chats between users, semantic to style the frontend and react for frontend development.

### Technologies

* React
* Express
* Semantic
* MongoDB
* Mongoose
* Socket.io
* Redux

### Individual Responsibilities

Alec implemented the backend and connected it to the frontend using Redux and axiom, Derek worked on the Socket.io messaging system and app deployment, and Dylan implemented the front-end development and design with Semantic.

### Lessons Learned

From this project we gained knowledge on the react lifecycle methods, mongoose .find functions to sort through collections. Process of redux (action, axios request, reducer, store, and state management). Express router for backend endpoints. Json web tokens for user authentication and user data.

### Grading Criteria

#### State management with Redux

We made use of Redux with the `User` and `Tutor` models. Relevant files can be found in `client/src/Actions`, `client/src/Reducers`, and `client/src/Components`.

#### Routes with Express

We worked to make our Express backend a fully-fledged API, through the use of routes. Look in `backend/Routes/api` for these implementations.

#### Socket.io

Used to connect users via live chat, as well as fire events to store those messages into MongoDB via Mongoose. The latter half of `backend/server.js` has socket backend implementation, and `client/src/components/ChatRoom.js` shows off Socket.io from the client side.

#### Authentication

We used json web tokens for user auth and data storing, which helped us to securely authenticate users within our application. Usage of this can be found in `client/components/Auth` as well as `backend/Validation`


### Future Work

CSS and Semantic styling still could use work. Validation and form feedback as well as navbar active items still need work.
 Some future feature ideas we have are:
 * Customizable subjects, rather than the broad preselected options
 * Scheduling appointments with tutors
 * A "tip jar" system, where students could tip their tutors for their help
