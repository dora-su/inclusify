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
            copied: ''
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
        let text_arr = (text.substring(0,index_c)+" ¶ "+text.substring(index_c)).split(/(?=[ .!,\n])|(?<=[ .!,\n])/g)
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
        this.setState({ changed_text: new_text, changed_raw:text_arr });
       
    }
    

    copyToClipboard = (e) => {
        document.getElementsByTagName('textarea').length!==0  ?      document.getElementsByTagName('textarea')[0].select() : document.getElementById('changed-text-area')[0].select();
        document.execCommand('copy');
        e.target.focus();
        this.setState({copied: 'Copied!'})
    }


    render() {
        let text = [];
        if (this.state.mode == 0) {
            text.push(<textarea autoFocus tabIndex="0" id="text-area" onClick={this.setCaret} className="text-area" onChange={this.updateInput} value={this.state.input_text}
                selectionEnd={this.state.caret_pos} placeholder="Type your text here"
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
<<<<<<< Updated upstream
            <button onClick={this.toChanged}className="inclusify-btn btn-1">Inclusify</button>
            <button className="inclusify-btn " onClick={() => {navigator.clipboard.writeText(this.state.input_text)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>
            </button>
=======
                            <button onClick={this.toChanged}className="inclusify-btn">Inclusify</button>
>>>>>>> Stashed changes
                        </div>
                        {(document.queryCommandSupported('copy') && document.getElementsByTagName('textarea')!==null )&& <div className="copy-text"><button onClick={this.copyToClipboard}> Click to copy text.</button> {this.state.copied}</div>}
                        
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