import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangedWord from "./changedword"
import ContentEditable from 'react-contenteditable'

class TextPage extends React.Component {
  constructor() {
    super();
    
    this.updateInput = this.updateInput.bind(this)
    this.changeText = this.changeText.bind(this)
    this.toChanged = this.toChanged.bind(this)

    this.state = {
        input_text: "fff",
        mode: 0
    }
   }

   updateInput(e) {
       console.log("df")
       this.setState({input_text: e.currentTarget.textContent})
   }

   toChanged() {
       this.setState({mode:1})
   }
   changeText(text) {
    
    let text_arr = text.split()
    let new_text = [];
   
    for (let i =0; i<text_arr.length; i++) {
            //do some function to i to check if bad word

            if (true) { //if word is bad word from function 
                new_text.push(<ChangedWord original_word={text[i]} synonyms={[]}/>) //get synonyms from json file
            } else {
                new_text.push(text[i])
            }
    }

    console.log(text)
   return new_text;
    }

  render() {
      let text;
      if (this.state.mode==0){
        text=this.state.input_text
      } else {
          
        text=this.changeText(this.state.input_text);
      }
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
            <div contenteditable="true" onInput={this.updateInput}>
            {this.state.input_text}
          
          </div>
            </Col>
          </Row>
          <button onClick={this.toChanged}>gobutton(test)</button>
        </Container>
        /* <input type="text" className="input-box"/>
            <button className="go-button">Go</button>
        <NewText/> */        
    );
  }
}

export default TextPage;