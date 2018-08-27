import React, { Component } from "react";
import { render } from "react-dom";
import style from './ExtraAccounts.scss'

// receives ExtraAccounts arr as prop, renders list of extra acconunts past limit
export default class ExtraAccounts extends Component {
  constructor(props){
    super(props);
    this.state = {isHovering:false}
    this.handleMouseHover = this.handleMouseHover.bind(this);
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
    let extraAccountsText = '';
    let lengthText = `+ ${this.props.extraAccounts.length} other`;
    lengthText += this.props.extraAccounts.length === 1 ? '' : 's';

    this.props.extraAccounts.forEach((el,i,arr)=>{
      extraAccountsText += `${el.name} (${el.username})`;
      if(i < arr.length - 1){
        extraAccountsText += ', ';        
      }
    })
    return(
      <div className={style.extraAccounts}>
        <div 
          className={style.extraAcctText}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {lengthText}
        </div>

        {
          this.state.isHovering &&
          <div className={style.hoverInfo}>
            {extraAccountsText}
          </div>
        } 
      </div>
    )    
  }
}