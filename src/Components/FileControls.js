import React from "react";
import Reflux from "reflux";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class FileControls extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal) {
      this.props.publishImage();
    }
  }

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
            <Button
              onClick={this.toggle}
              block
              className="float-right publishBtn"
            >
              Publish
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Hologrammed!</ModalHeader>
              <ModalBody>Saving your file...</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FileControls;
