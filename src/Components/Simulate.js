import React from "react";
import Reflux from "reflux";
import { Row, Col, Button } from "reactstrap";

class Simulate extends Reflux.Component {
  handleSimulation = e => {
    this.props.handleSimulation(e.target.checked);
  };

  render() {
    return (
      <Col>
        <div className="simulateRotation">
          <input type="checkbox" onChange={this.handleSimulation} />Simulate
          Device Rotation
        </div>
      </Col>
    );
  }
}

export default Simulate;
