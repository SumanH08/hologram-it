import React from "react";
import Reflux from "reflux";
import { Container, Row, Col } from "reactstrap";
import UploadPhoto from "./UploadPhoto.js";
import Settings from "./Settings.js";
import View from "./View.js";
import Simulate from "./Simulate.js";

class ConversionPage extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: [8, 7, 6, 5, 4, 3, 2, 1].map(item => {
        return { img: `https://parallex.netlify.com/${item}.png`, val: 0 };
      }),
      alpha: 0,
      beta: 0,
      gamma: 0
    };
    let isRotating = false,
      timerId;
  }

  setValue = (value, i) => {
    console.log(value, i);
    var tempArrVal = this.state.layers.slice();
    tempArrVal[i].val = value;
    this.setState({ layers: tempArrVal });
  };

  increaseValue = i => {
    var temp1Arr = this.state.layers.slice();
    temp1Arr[i].val += 1;
    this.setState({ layers: temp1Arr });
  };

  decreaseValue = i => {
    var temp2Arr = this.state.layers.slice();
    temp2Arr[i].val -= 1;
    this.setState({ layers: temp2Arr });
  };

  Simulate = isChecked => {
    this.isRotating = isChecked;
    if (this.isRotating) {
      this.setTimer();
    }
    if (!this.isRotating) {
      this.stopTimer();
    }
  };

  // TODO: ask eb why when i call this,simulateValue(), it wont work, but it works if i say this.simulateValues without brackets. how does the this work here

  setTimer = () => {
    this.timerId = setInterval(this.simulateValues, 500);
  };

  simulateValues = () => {
    this.setState({
      alpha: this.state.alpha + 1,
      beta: this.state.beta + 2,
      gamma: this.state.gamma + 1
    });

    // this.setState(prevState => ({
    //   alpha: prevState.alpha + 1
    // }));
    this.setState({
      alpha: this.state.alpha > 4 ? 8 - this.state.alpha : this.state.alpha,
      beta: this.state.beta > 4 ? 8 - this.state.beta : this.state.beta,
      gamma: this.state.gamma > 4 ? 8 - this.state.gamma : this.state.gamma
    });
  };

  stopTimer = () => {
    clearInterval(this.timerId);
  };

  render() {
    let checkPhoto;
    if (this.state.layers == null) {
      checkPhoto = <UploadPhoto />;
    } else {
      checkPhoto = (
        <View
          isRotating={this.props.isRotating}
          alpha={this.state.alpha}
          beta={this.state.beta}
          gamma={this.state.gamma}
          layers={this.state.layers}
        />
      );
    }
    return (
      <Container>
        <Row>
          <Col xs="6">{checkPhoto}</Col>
          <Col xs="6">
            <Settings
              handleChange={this.setValue}
              handlePlus={this.increaseValue}
              handleMinus={this.decreaseValue}
              layers={this.state.layers}
            />
            <Simulate handleSimulation={this.Simulate} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ConversionPage;
