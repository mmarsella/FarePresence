import { ADD_CHANNEL, REMOVE_CHANNEL, UPDATE_CHANNEL } from './actionTypes';

const initialState = {channels:{}};

export default (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    
    case ADD_CHANNEL:
      stateCopy = {...state}; 
      if(stateCopy.channels && !stateCopy.channels[action.channelName]){
        stateCopy.channels[action.channelName] = [];
      }
      return stateCopy;
      break;

    case REMOVE_CHANNEL:

      stateCopy = {...state};

      delete stateCopy.channels[action.channelName];
      return stateCopy;
      break;

    case UPDATE_CHANNEL:
       
      stateCopy = {...state};
      stateCopy.channels[action.channelName] = action.channel;

      return stateCopy;

    default:
      return state;
  }
};