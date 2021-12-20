import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga';

console.log = Reactotron.log;

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .use(reactotronRedux())
    .use(sagaPlugin())
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

export default reactotron
