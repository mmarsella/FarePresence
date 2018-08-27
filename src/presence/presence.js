import auth from '../auth/auth';
import _ from 'lodash'
import store from '../store';
import { addChannel, removeChannel, updateChannel } from "../api/channelActions";

const currentUser = auth().currentUser;

const presence = {
  channels: {}, // tracks all channels
  
  // Subscribe to the channel.
  subscribe(channelName) {
    let channel = this.channels[channelName];
    if(!channel){
      channel = this.channels[channelName] = [];
    } else {
      for(let i=0; i < channel.length; i++){
        if(channel[i].username === currentUser.username){
          return;
        }
      }
    }
    channel.push(currentUser);
    store.dispatch(addChannel(channelName));
    return channel;
  },
  
  // Unsubscribe from the channel.
  unsubscribe: function(channelName){
    delete this.channels[channelName];
    store.dispatch(removeChannel(this.channels, channelName));
  },
  
  // Adds or removes a random user to all current channels, for testing.
  // @param add:  Boolean. If true, add user, if false remove
  update: function(channelName, add){
    if(!channelName){
      return new Error('Need a channelName!');
    }

    return new Promise((resolve, reject) => {
      fetch('https://randomuser.me/api') 
        .then((resp) => resp.json())
        .then((resp) => {
        var randomUser = resp.results[0];
        const user = {
          name: randomUser.name.first+ ' ' + randomUser.name.last,
          username: randomUser.login.username,
          imageUrl: randomUser.picture.medium
        };

        if(add){
          this.channels[channelName].push(user);
        }else{
          this.channels[channelName].pop();      
        }

        store.dispatch(updateChannel(this.channels[channelName], channelName));
        // resolve with the current state of all channels
        resolve(this.channels);
      });
    })
  },

  // Observe a channel without acually subscribing to it
  observeChannel: function(channelName){
    return this.channels[channelName];
  }
}

export { presence }