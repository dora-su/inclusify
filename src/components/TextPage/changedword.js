import React, { Component } from 'react';
import "./textpage.css"
import Popover from '@material-ui/core/Popover';

class ChangedWord extends React.Component {
  constructor() {
  super();
  //props: original_word, synonym list

  this.openMenu = this.openMenu.bind(this);
  this.closeMenu = this.closeMenu.bind(this);
  this.changeWord = this.changeWord.bind(this);

  this.state = {
    menuOpen: false,
    selected: -1
  }
   }

   openMenu() {
     this.setState({menuOpen:true})
   }

   closeMenu() {
    this.setState({menuOpen:false})
   }

   changeWord(e) {
    
    this.setState({selected:e.target.value})
    this.props.replaceWord(this.props.index, this.props.synonyms[e.target.value]);
   }


  render() {

    let word;
    if (this.state.selected==-1) {
      word = this.props.original_word
    } else {
      word = this.props.synonyms[this.state.selected]
    }
    
    let synonym_buttons = []
    for (let i =0; i < this.props.synonyms.length;i++){
      synonym_buttons.push(<button onClick={this.changeWord} value={i}>{this.props.synonyms[i]}</button>)
    }
    return (
      <span>
      <Popover className="word-menu" onClose={this.closeMenu}
      open={this.state.menuOpen}
      transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
       
    >
    <button onClick={()=>{this.setState({selected:-1})}}>revert</button>
    {synonym_buttons}
    </Popover>
      <button onClick={this.openMenu} 
      className={(this.props.selected==-1) ? "word-btn changed-word" : "word-btn original-word"}>{word}</button>
      </span>
    );
  }
}

export default ChangedWord;