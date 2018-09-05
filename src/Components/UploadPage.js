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
import whaleImage from "../img/whaleImage.jpg";

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
      url: "http://138.197.206.149:8000/upload/",
      data: data,
      onUploadProgress: function(progressEvent) {
        var temp = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        self.setState({ percentCompleted: temp });
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

  fileOnChange = (event, img) => {
    this.setState({ file: event.target.files[0] });
  };

  uploadSample = id => {
    window.location.href = `/edit/${id}`;
  };

  render() {
    let progressBar = "";
    if (this.state.file !== null) {
      progressBar = (
        <div style={{ marginTop: "24px" }}>
          <Progress color="success" value={this.state.percentCompleted} />
        </div>
      );
    }
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
              <h4 style={{ textAlign: "center" }}>Upload a PSD file here</h4>
              <Form
                style={{ textAlign: "center" }}
                onSubmit={this.handleSubmit}
              >
                <FormGroup style={{ textAlign: "center" }}>
                  <Input
                    required
                    type="file"
                    id="file"
                    accept="image/psd"
                    onChange={this.fileOnChange}
                  />
                </FormGroup>
                <Button block type="submit">
                  Upload
                </Button>
              </Form>
              {progressBar}
            </CardBody>
          </Card>
          <h6 style={{ textAlign: "center" }}>
            or select the sample from below
          </h6>
          <div style={{ textAlign: "center" }}>
            <div onClick={this.uploadSample.bind(this, "whale")}>
              <img
                className="sampleImage"
                id="sample-1"
                src={whaleImage}
                alt="whale-img"
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
