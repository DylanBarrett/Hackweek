import React, { Component } from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

import "../styles/Profile.css";

// actions
import { addProfile } from "../Actions/User/UserAction";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      notLoggedIn: true
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    let token = localStorage.getItem("userToken");
    if (token) {
      this.setState({ notLoggedIn: false });
    } else {
      this.setState({ notLoggedIn: true });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("userToken");
    const decoded = jwt_decode(token);

    const newProfile = {
      id: decoded.id,
      subjects: this.state.subjects
    };

    this.props.addProfile(newProfile, this.props.history);
  }

  handleChange = (e, { value, checked }) => {
    let subjects = this.state.subjects;

    if (checked) {
      this.setState(state => ({
        ...state,
        subjects: [...state.subjects, value]
      }));
    } else {
      var index = subjects.indexOf(value);
      if (index > -1) {
        subjects.splice(index, 1);
        this.setState({
          subjects
        });
      }
    }
  };
  render() {
    const errors = this.props.profileErrors;
    return (
      <div>
        <div className="formInput">
          <h2>Profile</h2>
          {this.state.notLoggedIn ? (
            <div>Please login before viewing your profile</div>
          ) : (
            <div>
              <h3>Add subjects to your profile</h3>
              <Form onSubmit={this.onSubmit}>
                <Form.Field centered="true" error={Boolean(errors.error)}>
                  {errors.error ? (
                    <div className="error">{errors.error}</div>
                  ) : null}
                  <Checkbox
                    className="checkbox"
                    label="Math"
                    value="math"
                    name="math"
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    label="Science"
                    value="science"
                    name="science"
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    label="History"
                    value="history"
                    name="history"
                    onChange={this.handleChange}
                  />
                  <Checkbox
                    label="English"
                    value="english"
                    name="english"
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field
                  className="formInput"
                  control={Button}
                  fluid={true}
                  content="Submit"
                  color="green"
                />
              </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileErrors: state.userReducer.profileErrors
  };
};

export default connect(
  mapStateToProps,
  { addProfile }
)(Profile);
