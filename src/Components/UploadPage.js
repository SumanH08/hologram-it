import React from "react";
import Reflux from "reflux";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import { Progress } from "reactstrap";
import axios from "axios";

export class UploadPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      percentCompleted: 0
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    var data = new FormData();
    data.append("files", this.state.file);

    const self = this;

    axios({
      method: "post",
      url: "https://495e61cc.ngrok.io/upload/",
      data: data,
      onUploadProgress: function(progressEvent) {
        var temp = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        self.setState({ percentCompleted: temp });
        console.log(temp);
      }
    })
      .then(this.completed)
      .catch(err => {
        console.log(err);
      });

    return false;
  };

  completed = res => {
    if (res.status === 200) {
      window.location.href = `/edit/${res.data.id}`;
    }
  };

  fileOnChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  uploadSample = id => {
    window.location.href = `/edit/${id}`;
  };

  render() {
    return (
      <div>
        <Container>
          <Card
            style={{
              maxWidth: "396px",
              margin: "auto",
              marginTop: "64px",
              marginBottom: "64px"
            }}
          >
            <CardBody>
              <h4 style={{ textAlign: "center" }}>Upload photo here</h4>
              <Form
                style={{ textAlign: "center" }}
                onSubmit={this.handleSubmit}
              >
                <FormGroup style={{ textAlign: "center" }}>
                  <Input
                    type="file"
                    id="file"
                    accept="image/psd"
                    onChange={this.fileOnChange}
                  />
                </FormGroup>
                <Button block type="submit">
                  Submit
                </Button>
              </Form>
              <div style={{ marginTop: "24px" }}>
                <Progress color="success" value={this.state.percentCompleted} />
              </div>
            </CardBody>
          </Card>
          <div style={{ textAlign: "center" }}>
            <div
              className="sampleImage"
              onClick={this.uploadSample.bind(this, "whale")}
            >
              <img id="sample-1" src="hi.jpg" />
            </div>
            <div
              className="sampleImage"
              onClick={this.uploadSample.bind(this, "fox")}
            >
              <img id="sample-1" src="hi.jpg" />
            </div>
            <div
              className="sampleImage"
              onClick={this.uploadSample.bind(this, "dolphin")}
            >
              <img id="sample-1" src="hi.jpg" />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

// if (this.state.file !== null) {
//   console.log("Redirect here");
//   return <Redirect to="/edit/id" />;
// }
