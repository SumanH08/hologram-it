import React from "react";
import Reflux from "reflux";
import { Row, Col, Button } from "reactstrap";

class FileControls extends Reflux.Component {
  render() {
    return (
      <Col>
        <div className="fileControls">
          <Row>
            <Col
              className="no-gutters"
              lg="6"
              md="6"
              sm="6"
              xs="6"
              style={{ paddingRight: "0 !important" }}
            >
              <Button block className="changeFileBtn">
                Change File
              </Button>
            </Col>
            <Col lg="6" md="6" sm="6" xs="6">
              <Button block className="float-right publishBtn">
                Publish
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}

export default FileControls;
