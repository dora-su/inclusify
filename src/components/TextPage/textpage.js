import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangedWord from "./changedword"
import ContentEditable from 'react-contenteditable'
import $ from 'jquery'
import badwords from "../../words.json"
import "../../font.css"

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

        this.isBadWord = this.isBadWord.bind(this);
        this.state = {
            input_text: "",
            changed_text: [],
            changed_raw:[],
            mode: 0,
            caret_pos: 0,
            loading: false,
            charCount:0,
            copied: 'Copy to clipboard.'
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
                loading: false,
                charCount: e.target.value.length,
                copied: "Copy to clipboard."
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

        this.setState({ changed_raw: changed, input_text: changed.join(""), charCount:changed.join("").length })
    }

    isBadWord(word){
        for (var key in badwords) {
            if (key.toString()==word){
                return true;
            }
        }
        return false;

    }
    changeText() {

        let text = this.state.input_text;
        let index_c = this.state.caret_pos;
        let text_arr = (text.substring(0,index_c)+" ¶ "+text.substring(index_c)).split(/(?=[ .!,?])|(?<=[ .!,?])/g)
        let new_text = [];

        let adjust = 0;
        let space_count =0;

        for (let i = 0; i < text_arr.length; i++) {
            //do some function to i to check if bad word
            let word = text_arr[i]
            if (word.trim()==""){
                space_count+=1
            }
            if (this.isBadWord(word)) { //if word is bad word from function 
            
                new_text.push(<span><ChangedWord index={i} original_word={word} synonyms={badwords[word]}
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

        
        this.setState({ changed_text: new_text, changed_raw:text_arr});
       
    }

    

    copyToClipboard = (e) => {
        if (navigator.clipboard) 
        if (this.state.mode == 0) {
            navigator.clipboard.writeText(this.state.input_text)
        }else{
            let innertext = document.getElementById("changed-text-area").innerText;
            innertext = innertext.substr(0,innertext.length-1);
            navigator.clipboard.writeText(innertext)
            // navigator.clipboard.writeText(tistext)
        }
        this.setState({copied:"Copied!"})
    }


    render() {
        let text = [];
        if (this.state.mode == 0) {
            text.push(<textarea autoFocus data-gramm_editor="false" placeholder="Type your text here." tabIndex="0" id="text-area" onClick={this.setCaret} className="text-area" onChange={this.updateInput} value={this.state.input_text}
                selectionEnd={this.state.caret_pos}
            />)
        } else {

            text.push(<div tabindex="0" className="changed-c" id="changed-text-area" onKeyDown={this.onKeyDown}><div onClick={this.toEdit} className="changed-text-c" onKeyDown={this.onKeyDown}>            
            </div>
                {this.state.changed_text}
            </div>);

        }
        

        return (
            <div>
                <div>

                    <img class="lower-tri" src="/triangles.png"/>

                    <Container className="page-container" onKeyDown={this.onKeyDown}>
                        <span class="text-title">Type here:

                        </span>
                        <div class="text-container">
                            {text}
                            <button onClick={this.toChanged}className="inclusify-btn">Inclusify</button>
                        </div>
                        
                      <div className="copy-text"><div className="char-count">{this.state.charCount}</div> <div className="copy-button"><button className="bg-transparent border-0 copy-text-button" onClick={this.copyToClipboard}> {this.state.copied} </button></div></div>
                        
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