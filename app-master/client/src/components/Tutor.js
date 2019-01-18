import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Button, Container, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "../styles/Tutor.css";


// action
import { getSubjects, getTutors } from "../Actions/User/TutorAction";

class Tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      notLoggedIn: true
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("userToken");
    if (token) {
      this.setState({ notLoggedIn: false });
      const decoded = jwt_decode(token);
      let user = decoded.id;
      this.props.getSubjects(user);
    } else {
      this.setState({ notLoggedIn: true });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.subjects !== this.props.subjects) {
      this.props.getTutors(this.props.subjects);
    }
  };

  render() {
    return (
      <Container>
        <h1>Find a tutor</h1>
        {this.state.notLoggedIn ? (
          <div>Please login before searching for tutors</div>
        ) : (
          <Card.Group centered>
            {this.props.tutorErrors ? (
              <div>There are currently no tutors matching your subjects.</div>
            ) : null}
            {this.props.tutors
              ? this.props.tutors.map((tutor, index) => {
                let chatLink = '/chat/' + tutor._id;
                  return (
                    <Card className="tutor-container" color="blue" key={index}>
                      <Card.Content>
                        <Card.Header>{tutor.name}</Card.Header>
                        <Card.Meta>{tutor.userType}</Card.Meta>
                        <Card.Description className="tutor-desc">
                          <h3>Subjects</h3>
                          <ul className="subject-list">
                            {tutor.subjects.map((subject, index) => {
                              return (
                                <li key={index} className="subject">
                                  {subject}
                                </li>
                              );
                            })}
                          </ul>
                        </Card.Description>
                        <Link to={chatLink}>
                          <Button content="Select" color="blue" />
                        </Link>
                      </Card.Content>
                    </Card>
                  );
                })
              : null}
          </Card.Group>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    tutorErrors: state.tutorErrors,
    subjects: state.tutorReducer.subjects,
    tutors: state.tutorReducer.tutors
  };
};

export default connect(
  mapStateToProps,
  { getSubjects, getTutors }
)(Tutor);
