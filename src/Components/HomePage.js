import React from "react";
import Reflux from "reflux";
import { Container, Button } from "reactstrap";

class HomePage extends Reflux.Component {
  onClick = () => {
    console.log("onlick inside home page");
    window.location.href = "/new/";
  };

  render() {
    return (
      <div>
        <Container>
          <div style={{ textAlign: "center", padding: "24px" }}>
            Welcome to OHMYHOLO!<br />
            <p className="intro-text">
              You can upload your PSD file using the "New Hologram" tab. We
              first convert your file into layers and animate each layer to
              produce a hologram effect.
            </p>
            <Button onClick={this.onClick}>Get Started</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default HomePage;
