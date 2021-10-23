import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {appPersistReducer} from './reducers';
import {persistStore} from 'redux-persist';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        data: appPersistReducer,
    },
    middleware: [sagaMiddleware],
    preloadedState: {},
},);


const persistor = persistStore(store);
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

sagaMiddleware.run(rootSaga);
// sagaMiddleware.run(watchForFirebaseAuth);
export {getStore, getState, getPersistor};
export default {
    getStore,
    getState,
    getPersistor,
};
