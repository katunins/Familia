import React from "react";
import {View, Text, LogBox} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import Screens from "./src/screens";
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import {rem} from "./src/styles/remStyles";
import {getPersistor, getStore} from "./src/store";
import {GeneralColors} from "./src/config";

EStyleSheet.build({
    "@media ios": {
        $rem: rem,
        $remJsx: rem
    },
    "@media android": {
        $rem: rem,
        $remJsx: rem
    },
    ...GeneralColors
});

LogBox.ignoreAllLogs()
const App = () => {
    const myPersistor = getPersistor();
    const myStore = getStore();
    return (
        <Provider store={myStore}>
            <PersistGate persistor={myPersistor}>
                <NavigationContainer>
                    <Screens/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};
export default App;
