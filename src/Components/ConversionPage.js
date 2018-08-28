import React from "react";
import Reflux from "reflux";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import UploadPhoto from "./UploadPhoto.js";
import Settings from "./Settings.js";
import View from "./View.js";
import Simulate from "./Simulate.js";
import FileControls from "./FileControls.js";
import { LayerSettings } from "./LayerSettings.js";

class ConversionPage extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: [8, 7, 6, 5, 4, 3, 2, 1].map(item => {
        return { img: `/img-layers/${item}.png`, val: 0 };
      }),
      alpha: 0,
      beta: 0,
      gamma: 0,
      isRotating: false
    };

    this.timerId = false;
    this.factor = 1;
  }

  setValue = (value, i) => {
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

  setLayers = layers => {
    this.setState({ layers: layers });
  };

  simulate = isChecked => {
    // this.isRotating = isChecked;
    this.setState({ isRotating: isChecked }, function() {
      if (this.state.isRotating) {
        this.setTimer();
      }
      if (!this.state.isRotating) {
        this.stopTimer();
      }
    });
  };

  // TODO: ask eb why when i call this,simulateValue(), it wont work, but it works if i say this.simulateValues without brackets. how does the this work here

  setTimer = () => {
    this.timerId = setInterval(this.simulateValues, 50);
  };

  simulateValues = () => {
    this.setState(
      {
        alpha: this.state.alpha + this.factor,
        beta: this.state.beta + this.factor
      },
      function() {
        if (this.state.alpha === 10) {
          this.factor = -1;
        } else if (this.state.alpha === -10) {
          this.factor = 1;
        }
      }
    );
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.setState({ alpha: 0, beta: 0 });
  };

  render() {
    let checkPhoto;
    if (this.state.layers == null) {
      checkPhoto = <UploadPhoto />;
    } else {
      checkPhoto = (
        <View
          isRotating={this.state.isRotating}
          alpha={this.state.alpha}
          beta={this.state.beta}
          gamma={this.state.gamma}
          layers={this.state.layers}
        />
      );
    }
    return (
      <div className="wrapper">
        <Container>
          <Row>
            <Col lg="8">
              <Card
                style={{
                  border: "none",
                  height: "calc(100vh - 56px - 60px)",
                  background: "white",
                  zIndex: -1000
                }}
              >
                <CardBody>
                  <div className="checkPhoto">{checkPhoto}</div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <FileControls />
              <Settings
                setLayers={this.setLayers}
                layers={this.state.layers}
                handleChange={this.setValue}
                handlePlus={this.increaseValue}
                handleMinus={this.decreaseValue}
              />
              <Simulate handleSimulation={this.simulate} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ConversionPage;

// <Settings
//   handleChange={this.setValue}
//   handlePlus={this.increaseValue}
//   handleMinus={this.decreaseValue}
//   layers={this.state.layers}
// />
