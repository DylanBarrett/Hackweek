import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import background from "../images/landing.jpg";

import "./Landing.css";

const style = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  width: "100%",
  height: "300px"
};
export default class Landing extends Component {
  render() {
    return (
      <div>
        <h1 className="landing-title">
          Welcome to the internets main hub for all things tutoring.
        </h1>
        <div className="background-image" style={style} />
        <div className="intro">
          <Container>
            <h1>What we are about</h1>
            <Divider />
            <p className="desc">
              Here at Tutor Finder, we strive to match you with the perfect
              tutor that'll fit with your learning style. Our tutors will go at
              a pace that works for you and are readily available 24/7. Studies
              show that 97% of struggling students that turn to tutoring
              increase test scores by entire letter grades. With our competitive
              rates, you can enjoy the stress free tutoring offered here at
              Tutor Finder Today!
            </p>
          </Container>
        </div>
      </div>
    );
  }
}
