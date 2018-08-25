import React from "react";
import Reflux from "reflux";

class Simulate extends Reflux.Component {
  handleSimulation = e => {
    this.props.handleSimulation(e.target.checked);
  };

  render() {
    return (
      <div>
        <input type="checkbox" onChange={this.handleSimulation} />Simulate
        Device Rotation
      </div>
    );
  }
}

export default Simulate;
