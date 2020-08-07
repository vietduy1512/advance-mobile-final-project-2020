import {combineReducers} from 'redux';
import bookmarkReducer from './bookmarkReducer';

export default combineReducers({
  bookmark: bookmarkReducer,
});
