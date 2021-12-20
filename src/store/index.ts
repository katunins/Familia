import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {appPersistReducer} from './reducers';
import {persistStore} from 'redux-persist';
import rootSaga from './saga';
import Reactotron from './../../ReactotronConfig';
import ReactotronSrc from 'reactotron-react-native';

const sagaMonitor = (ReactotronSrc as any).createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = configureStore({
    reducer: {
        data: appPersistReducer,
    },
    middleware: [sagaMiddleware],
    preloadedState: {},
    // @ts-ignore
    enhancers: [Reactotron.createEnhancer()],
},);


const persistor = persistStore(store);
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

sagaMiddleware.run(rootSaga);

export {getStore, getState, getPersistor};
export default {
    getStore,
    getState,
    getPersistor,
};
