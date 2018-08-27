import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'; // mimic $watchList w/ Redux
import store from './store';
import FarePresenceDemo from "./FarePresenceDemo";
// import FarePresence from "./farePresence/FarePresence";

// Demo component contains Logic to ping the mock Presence API to trigger re-renders.
export default class App extends Component {

  render(){
    return(
      <Provider store={store}>
        <FarePresenceDemo/>
      </Provider>
    )
  }
}