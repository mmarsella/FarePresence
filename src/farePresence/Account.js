import React, { Component } from "react";
import { render } from "react-dom";
import style from './account.scss'

// Receives User obj as prop, renders user img
export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = { isHovering:false }
    this.handleMouseHover = this.handleMouseHover.bind(this);
    // for passing down a random bg color
    this.acctBackground = { border: `solid 2px ${this.props.bgColor}`};
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render(){
    return(
      <div className={style.icon}>
        <img
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          className={style.accountImg}
          src={this.props.user.imageUrl}
          alt="User icon"
          style={this.acctBackground}
        />
        {
          this.state.isHovering &&
          <div className={style.hoverInfo}>
            {this.props.user.name} ({this.props.user.username})            
          </div>
        } 
      </div>
    )    
  }
}