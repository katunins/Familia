import React from "react";
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

const Loader:React.FunctionComponent = () =>{
    return(
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={EStyleSheet.value('$colorWhite')}/>
        </View>
    )
}
export default Loader
