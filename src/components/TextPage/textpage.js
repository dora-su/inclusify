import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangedWord from "./changedword"
import ContentEditable from 'react-contenteditable'
import $ from 'jquery'

$.fn.selectRange = function (start, end) {
    if (end === undefined) {
        end = start;
    }
    return this.each(function () {
        if ('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if (this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

class TextPage extends React.Component {
    constructor() {
        super();

        this.updateInput = this.updateInput.bind(this)
        this.changeText = this.changeText.bind(this)

        this.toChanged = this.toChanged.bind(this)
        this.toEdit = this.toEdit.bind(this)

        this.onKeyDown = this.onKeyDown.bind(this)

        this.replaceWord = this.replaceWord.bind(this);

        this.setCaret = this.setCaret.bind(this)

        this.load = this.load.bind(this)
        this.state = {
            input_text: "hello my name is Hughy and I am a bee keeper",
            changed_text: [],
            changed_raw:[],
            mode: 0,
            caret_pos: 0,
            loading: false
        }

    }

     onKeyDown(e) {

        if (this.state.mode == 1) {
            this.toEdit()

        }
    }

    setCaret(e) {
        this.setState({ caret_pos: e.target.selectionStart })
    }
    updateInput = (e) => {

        this.setState(
            {
                mode: 0,
                caret_pos: e.target.selectionStart,
                input_text: e.target.value,
                loading: false
            }
        )


        var duration = 2000;
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(() => {

            this.setState({ loading: true })
            this.load()
        }, duration);
    }

    load = (e) => {
        var duration = 2000;
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(() => {

            this.toChanged()
            this.setState({ loading: false })
        }, duration);
    }

    toChanged() {
        this.changeText()
        this.setState({ mode: 1 })
    }

    async toEdit() {
        await this.setState({ mode: 0 })
        setTimeout($('.text-area').selectRange(this.state.caret_pos))

    }

    replaceWord(old_index, new_word) {
        let changed = this.state.changed_raw
        
        changed[old_index] = new_word;
       // console.log(changed.join(""));
       changed.splice(changed.indexOf("¶")-1,1)
       changed.splice(changed.indexOf("¶"),2)

        this.setState({ changed_raw: changed, input_text: changed.join("") })
    }

    changeText() {

        let text = this.state.input_text;
        let index_c = this.state.caret_pos;
        let text_arr = (text.substring(0,index_c)+" ¶ "+text.substring(index_c)).split(/(?=[ /n])|(?<=[ /n])/g)
        let new_text = [];

        let adjust = 0;
        let space_count =0;
        for (let i = 0; i < text_arr.length; i++) {
            //do some function to i to check if bad word
            let word = text_arr[i]
            console.log(word)
            if (word.trim()==""){
                space_count+=1
            }
            if (word == "hello" ) { //if word is bad word from function 
                console.log(i)
                new_text.push(<span><ChangedWord index={i} original_word={word} synonyms={["boop", "beep"]}
                    replaceWord={this.replaceWord} />{" "}</span>) //get synonyms from json file
            } else if(word=="¶") {
                new_text.push(<span className="caret">|</span>)
            }
            else {
                if (i==text_arr.indexOf("¶")+1 || i==text_arr.indexOf("¶")-1){
                    continue;
                } else {
                new_text.push(word)
               
                }
            }
        }

        this.setState({ changed_text: new_text, changed_raw:text_arr });
       
    }

    render() {

        let text = [];
        if (this.state.mode == 0) {
            text.push(<textarea autoFocus tabIndex="0" id="text-area" onClick={this.setCaret} className="text-area" onChange={this.updateInput} value={this.state.input_text}
                selectionEnd={this.state.caret_pos}
            />)
        } else {

            text.push(<div tabindex="0" className="changed-c" onKeyDown={this.onKeyDown}><div onClick={this.toEdit} className="changed-text-c" onKeyDown={this.onKeyDown}>
            </div>
                {this.state.changed_text}
            </div>);

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

                <div className={(this.state.loading) ? "show" : "hide"}>
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