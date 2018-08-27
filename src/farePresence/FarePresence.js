import React, { Component } from "react";
import { render } from "react-dom";
import style from './FarePresence.scss';
import { presence } from '../presence/presence.js';
import auth from '../auth/auth';
import Account from './Account';
import ExtraAccounts from './ExtraAccounts';
import Demo from "../Demo"
import { connect } from 'react-redux'; // to mimic $watchList
import store from '../store'; // to mimic $watchList

// parent component, passes down changes on user array received from pusher channel.   
// takes a channel name as a prop
class FarePresence extends Component {
  constructor(props){
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {};
    this.limit = 5; // amount of accounts to render
    this.colors = ['#b91a26', '#4281bb', '#67216a', '#ae6e18', '#36b68f', '#0c6449']; // for fun...
    this.currentUser = auth().currentUser;
  }

  // when FarePresence is added to DOM - subscribe to channel.
  componentDidMount(){
    let channel = presence.subscribe(this.props.channelName);
  }

  // if component is removed from DOM - unsubscribe from channel.
  componentWillUnmount(){
    presence.unsubscribe(this.props.channelName);
  }

  // mock websocket + $watch
  handleAdd(){
    presence.update(this.props.channelName, true).then((channels)=>{})
  }

  // mock websocket + $watch
  handleRemove(){
    presence.update(this.props.channelName, false).then((channels)=>{})
  }

  render(){
    let accounts = [];
    let extraAccounts = []; // all accounts after the limit
    if(this.props.channel && this.props.channel.length > 0){
      // iterate over all users in the channel
      this.props.channel.forEach((el,i)=>{
        // don't render currentUser
        if(el.username === this.currentUser.username){
          return;
        }
        // render accounts if under the max limit, otherwise add to the +N
        if(accounts.length < this.limit){
          let bgColor = this.colors[Math.floor(Math.random() * this.colors.length)];
          accounts.push(
            <Account
              user={el}
              key={i}
              bgColor={bgColor}
            />)
        } else {
          extraAccounts.push(el);
        }
      })
    }
    return(
      <div className={style.container}>
        <div className={style.accounts}>{accounts}</div>
        { extraAccounts.length > 0 &&
          <ExtraAccounts
            extraAccounts={extraAccounts}
          />
        }
        <Demo
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
          channelName={this.props.channelName}
        />
      </div>
    )
  }
}

// mimic $watchList w/ react-redux, does a shallow comparison to trigger re-renders
const mapStateToProps = (store, ownProps) => {
  return {
    channel: store.channels[ownProps.channelName],
    channelLength: store.channels[ownProps.channelName] ? store.channels[ownProps.channelName].length : 0
  }
}

export default connect(mapStateToProps)(FarePresence);