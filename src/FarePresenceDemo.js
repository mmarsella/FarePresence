import React, { Component } from "react";
import { render } from "react-dom";
import FarePresence from "./farePresence/FarePresence";
import { presence } from './presence/presence.js';
import style from './FarePresenceDemo.scss'

// Interface to presence API
export default class FarePresenceDemo extends Component {
  constructor(props){
    super(props);
    this.state = {
      observeChannel: null
    }
    this.handleClick = this.handleClick.bind(this) 
  }

  handleClick(channelName){
    this.state.observeChannel = presence.observeChannel(channelName);
    console.log(`Observing ${channelName} ==>`, this.state.observeChannel);
  }

  render(){
    return(
      <div>
        <FarePresence
          channelName='channel-1'
        />
        <FarePresence
          channelName='channel-2'
        />
        <FarePresence
          channelName='channel-1'
        />
        <div className={style.demoBtns}>
          <div
            onClick={() => this.handleClick('channel-1')}
            className={style.observeDemoBtn}
          >
            Observe channel-1
          </div>
          <div
            onClick={() => this.handleClick('channel-2')}
            className={style.observeDemoBtn}
          >
            Observe channel-2
          </div>
          <h5 className={style.observeText}> (Outputs in console) </h5>
        </div>
      </div>
    )
  }
}