import React from "react";
import Reflux from "reflux";
import { Row, Col, Button } from "reactstrap";

class FileControls extends Reflux.Component {
  render() {
    return (
      <div className="fileControls">
        <Row>
          <Col>
            <Button block className="changeFileBtn">
              Change File
            </Button>
          </Col>
          <Col>
            <Button block className="float-right publishBtn">
              Publish
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FileControls;
