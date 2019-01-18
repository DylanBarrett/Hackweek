import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/App.css";

import Nav from "../components/Layout/Nav";
import Landing from "../components/Layout/Landing";
import Footer from "../components/Layout/Footer";

import "../styles/App.css";
import "semantic-ui-css/semantic.min.css";

import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Profile from "../components/Profile";
import Tutor from "../components/Tutor";
import ChatRoom from "../components/ChatRoom";
import Inbox from '../components/Inbox';

class App extends Component {
  state = { users: [] };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            onref={ref => {
              this.nav = ref;
            }}
          />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} toggleUser={this.nav.toggleUser} />
            )}
          />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/tutors" component={Tutor} />
          <Route exact path="/chat/:to" component={ChatRoom}/>
          <Route exact path='/inbox/' component={Inbox}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
