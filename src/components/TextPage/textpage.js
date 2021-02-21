import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangedWord from "./changedword"

class TextPage extends React.Component {
  constructor() {
    super();
    
    this.state = {
        inner_text: [],
    }
   }

   changeText(e) {
    let text = this.props.input_text.split()
    let new_text = [];

    for (let i =0; i<text.length; i++) {
            //do some function to i to check if bad word

            if (true) { //if word is bad word from function 
                new_text.push(<ChangedWord original_word={text[i]} synonyms={[]}/>) //get synonyms from json file
            } else {
                new_text.push(text[i])
            }
    }

    this.setState({inner_text:new_text})
    }

  render() {
    return (
          <Container
          fluid={true}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
        <ChangedWord original_word="hello" synonyms={["hey there", "hellooo"]}/>
          <Row className="textpage-row" style={{ marginRight: 0, marginLeft: 0 }}>
            <Col
              xs="12"
              md="6"
              className="textpage-input"
            >
            <div contenteditable="true">
           {this.state.inner_text}
          </div>
            </Col>
          </Row>
          <button>gobutton(test)</button>
        </Container>
        /* <input type="text" className="input-box"/>
            <button className="go-button">Go</button>
        <NewText/> */        
    );
  }
}

export default TextPage;