import React from "react";
import Reflux from "reflux";
import { Row, Col, Button, ButtonGroup } from "reactstrap";

class Settings extends Reflux.Component {
  handleChange = (i, e) => {
    if (!e.target.value) {
    } else if (isNaN(parseInt(e.target.value, 10))) {
      this.props.handleChange(0, i);
    } else {
      this.props.handleChange(parseInt(e.target.value, 10), i);
    }
  };

  handlePlus = i => {
    this.props.handlePlus(i);
  };

  handleMinus = i => {
    this.props.handleMinus(i);
  };

  render() {
    let settings = this.props.layers.map((item, i) => {
      return (
        <Row key={i}>
          <Col xs="6">
            <img className="img-settings" alt="layers" src={item.img} />
          </Col>
          <Col xs="6">
            <ButtonGroup>
              <Button onClick={this.handleMinus.bind(this, i)}>-</Button>
              <input
                type="number"
                pattern="[0-9]*"
                value={item.val}
                onChange={this.handleChange.bind(this, i)}
              />
              <Button onClick={this.handlePlus.bind(this, i)}>+</Button>
            </ButtonGroup>
          </Col>
        </Row>
      );
    });
    return (
      <div className="settings">
        Settings
        {settings}
      </div>
    );
  }
}

export default Settings;
