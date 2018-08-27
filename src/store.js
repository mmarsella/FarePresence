import { createStore } from 'redux';
import channelReducer from './api/channelReducer';

export default createStore(channelReducer);