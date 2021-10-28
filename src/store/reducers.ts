import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import loader from './slice/loader.slice';
import modal from './slice/modal.slice';
import relatives from './slice/relatives.slice';
import user from './slice/user.slice';
import posts from './slice/posts.slice'
import token from './slice/token.slice'

const appPersist = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'relatives', 'posts', 'token'],
  blacklist: [],
};

const appReducers = combineReducers({
  loader,
  modal,
  relatives,
  user,
  posts,
  token
});
export const appPersistReducer = persistReducer(appPersist, appReducers);
