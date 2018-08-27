# FarePresence

# About the Component
The source code for the `FarePresence` component can be found in `src/farePresence`.

# About the Demo
The demo is setup with 2 channels. Channel-1 is rendered twice to demonstrate a websocket connection shared between the same channel and pushing changes to all components subscribed to the same channel. Channel-2 should be independent from Channel-1 updates and vice versa.  

In order to replicate AngularJS's $watchList - I added `react-redux` to wrap the demo container of this project - when the presence API is called - changes are made to the redux store and will trigger a re-render in a component based on the channel they are subscribed to.

Lastly, you are able to "observe" a channel without subscribing to it by clicking one of the observe channel buttons - which will return the current state of a channel in the console.