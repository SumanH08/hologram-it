import React from "react";
import Reflux from "reflux";
import { Col } from "reactstrap";

class Simulate extends Reflux.Component {
  handleSimulation = e => {
    this.props.handleSimulation(e.target.checked);
  };

  render() {
    return (
      <Col>
        <div className="simulateRotation">
          <label class="container">
            <input type="checkbox" onChange={this.handleSimulation} />
            <span class="checkmark" />
            Simulate Device Rotation
          </label>
        </div>
      </Col>
    );
  }
}

export default Simulate;
