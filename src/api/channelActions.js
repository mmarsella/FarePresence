import { ADD_CHANNEL, REMOVE_CHANNEL, UPDATE_CHANNEL } from './actionTypes';

export const addChannel = (channelName) => {
  return {
    type: ADD_CHANNEL,
    channelName
  }
}

export const removeChannel = (channelName) => {
  return {
    type: REMOVE_CHANNEL,
    channelName
  }
}

export const updateChannel = (channel, channelName) => {
  return {
    type: UPDATE_CHANNEL,
    channel,
    channelName
  }
}
