import React from "react";
import Reflux from "reflux";
import { FormGroup, Label, Input } from "reactstrap";

class Simulate extends Reflux.Component {
  handleSimulation = e => {
    this.props.handleSimulation(e.target.checked);
  };

  render() {
    return (
      <div className="simulateRotation">
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={this.handleSimulation} /> Simulate
            Device Rotation
          </Label>
        </FormGroup>
      </div>
    );
  }
}

export default Simulate;
