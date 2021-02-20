import React, { Component } from 'react';
import "./textpage.css"
import NewText from "./newtext"

class TextPage extends React.Component {
  constructor() {
	super();
   }


  render() {
    return (
        <div className="textpage-container">
            <input type="text" className="input-box"/>
            <button className="go-button">Go</button>
        <NewText/>
        </div>
    
    );
  }
}

export default TextPage;