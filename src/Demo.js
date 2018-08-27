import React, { Component } from "react";
import { render } from "react-dom";
import style from './Demo.scss';
import { presence } from './presence/presence.js';

// Interface to presence API
export default class Demo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className={style.container}>
        <div 
          className={style.addUserBtn}
          onClick={this.props.handleAdd}
        >
        Subscribe
        </div>

        <div 
          className={style.removeUserBtn}
          onClick={this.props.handleRemove}
        >
        Unsubscribe
        </div>
        <span> {this.props.channelName} </span>
      </div>
    )
  }
}