import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangedWord from "./changedword"
import ContentEditable from 'react-contenteditable'
import $ from 'jquery'

class TextPage extends React.Component {
    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this)
        this.changeText = this.changeText.bind(this)

        this.toChanged = this.toChanged.bind(this)
        this.toEdit = this.toEdit.bind(this)

        this.onKeyDown = this.onKeyDown.bind(this)

        this.replaceWord = this.replaceWord.bind(this);
        this.state = {
            input_text: "hello my name is Hughy and I am a bee keeper",
            changed_text: [],
            mode: 0,
            caret_pos: 0
        }
        
    }

    onKeyDown(e) {
        if (this.state.mode==1){
        let text = this.state.input_text+String.fromCharCode(e.keyCode);
        this.setState(
            {
                input_text: text,
                mode: 0
            })
           
        }
    }

    updateInput = (e) => {

        let carat_pos
        this.setState({ mode: 0, caret_pos: e.target.selectionStart })
        this.setState({ input_text: e.target.value })

        var duration = 2000;
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(()=>{
          this.toChanged()
      }, duration);
    }

    toChanged() {
        this.changeText()
        this.setState({ mode: 1 })
    }

    toEdit() {
        this.setState({ mode: 0 })
    //document.getElementById("text-area").selectionStart = 4;

        
    }

    replaceWord(old_index, new_word) {
        let changed = this.state.changed_text
        changed[old_index] = new_word;
        console.log(changed);
        this.setState({changed_text: changed, input_text: changed.join(" ")})
      }

      
    changeText() {

        let text = this.state.input_text;
        let index = this.state.caret_pos;
        let text_arr = (text.substr(0, index) + "| " + text.substr(index)).split(" ")
        let new_text = [];
        
        for (let i = 0; i < text_arr.length; i++) {
            //do some function to i to check if bad word
            let word= text_arr[i].trim();
            if (word=="hello") { //if word is bad word from function 
                new_text.push(<ChangedWord index={i} original_word={word} synonyms={["boop","beep"]} 
                replaceWord={this.replaceWord}/>) //get synonyms from json file
                
            } else {
                new_text.push(" "+text_arr[i]+" ")
            }
        }


        this.setState({changed_text:new_text});
    }

    render() {

        let text = [];
        if (this.state.mode == 0) {
            text.push(<textarea autoFocus id="text-area" className="text-area" onChange={this.updateInput} value={this.state.input_text}
                selectionStart={this.state.caret_pos}
            />)
        } else {

            text.push(<div tabindex="0" className="changed-c"><div onClick={this.toEdit} className="changed-text-c" onKeyDown={this.onKeyDown}>
            </div>
                {this.state.changed_text}</div>);
           
        }
        return (
            <div>
            <div>
                
            <Container className="page-container" onKeyDown={this.onKeyDown}>
            <span class="text-title">Type here:</span>
                        <div class="text-container">
                            {text}

                        </div>
                
            </Container>
            </div>

            <div className="loading-c">
            <div class="loader">
	<div class="loader-inner">
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
		<div class="loader-line-wrap">
			<div class="loader-line"></div>
		</div>
	</div>
</div>

                </div>
                </div>
            /* <input type="text" className="input-box"/>
                <button className="go-button">Go</button>
            <NewText/> */
        );
    }
}

export default TextPage;