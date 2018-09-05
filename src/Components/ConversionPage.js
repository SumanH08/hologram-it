import React from "react";
import Reflux from "reflux";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Settings from "./Settings.js";
import View from "./View.js";
import Simulate from "./Simulate.js";
import FileControls from "./FileControls.js";
import axios from "axios";
import loading from "../img/loading.svg";

class ConversionPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      alpha: 0,
      beta: 0,
      gamma: 0,
      isRotating: false,
      loading: true
    };
    this.timerId = false;
    this.factor = 1;
    this.id = 0;
  }

  componentDidMount() {
    console.log("Prevprops here", this.props.match.params);
    this.id = this.props.match.params.imageid;
    console.log("id here", this.id);
    if (this.props.match.params.imageid === "whale") {
      console.log("Bringing up whale picture");
      var tempLayers;
      tempLayers = [8, 7, 6, 5, 4, 3, 2, 1].map(item => {
        return { img: `/img-layers/${item}.png`, val: 0 };
      });
      this.setState({ layers: tempLayers }, function() {
        this.setState({ loading: false });
      });
    } else {
      axios({
        method: "get",
        url: `http://138.197.206.149:8000/holo/${this.id}`
      })
        .then(this.getImageFromAPI)
        .catch(err => {
          console.log(err);
        });
    }
  }

  getImageFromAPI = res => {
    this.setState({ loading: false });
    var tempArr = this.state.layers.slice();
    tempArr = res.data.images.map((item, i) => {
      return { img: `http://138.197.206.149:8000${item}`, val: 0 };
    });

    tempArr.shift();
    tempArr = tempArr.reverse();
    this.setState({ layers: tempArr });
  };

  publishImage = () => {
    axios({
      method: "post",
      url: `http://138.197.206.149:8000/publish/${this.id}`
    })
      .then(this.getUpdatedLink)
      .catch(err => {
        console.log(err);
      });
  };

  getUpdatedLink = () => {
    console.log("Updated link here");
  };

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

  toggleSimulation = isChecked => {
    this.setState({ isRotating: isChecked }, function() {
      if (this.state.isRotating) {
        this.setTimer();
      }
      if (!this.state.isRotating) {
        this.stopTimer();
      }
    });
  };

  setTimer = () => {
    this.timerId = setInterval(this.simulateValues, 500);
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
    if (this.state.loading) {
      return (
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          Loading<img src={loading} alt="Loading-img" />
        </div>
      );
    } else {
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
                    <div>
                      <View
                        isRotating={this.state.isRotating}
                        alpha={this.state.alpha}
                        beta={this.state.beta}
                        gamma={this.state.gamma}
                        layers={this.state.layers}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <FileControls publishImage={this.publishImage} />
                <Settings
                  setLayers={this.setLayers}
                  layers={this.state.layers}
                  handleChange={this.setValue}
                  handlePlus={this.increaseValue}
                  handleMinus={this.decreaseValue}
                />
                <Simulate handleSimulation={this.toggleSimulation} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default ConversionPage;
