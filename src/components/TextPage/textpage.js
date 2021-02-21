import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class TextPage extends React.Component {
  constructor() {
	super();
   }
  render() {
    return (
          <Container
          fluid={true}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Row className="textpage-row" style={{ marginRight: 0, marginLeft: 0 }}>
            <Col
              xs="12"
              md="6"
              className="textpage-input"
            >
              <textarea
              className="input-box"
          rows={20}
          placeholder="Type here."
        />
            </Col>
            <Col xs="12" md="6" className="textpage-output">
            <textarea
            className="output-box"
          placeholder="Your converted text will show up here."
          disabled={true}
          rows={20}
        />
            </Col>
          </Row>
        </Container>
        /* <input type="text" className="input-box"/>
            <button className="go-button">Go</button>
        <NewText/> */        
    );
  }
}

export default TextPage;