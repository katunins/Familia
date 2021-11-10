import React from "react";
import Svg, {Path} from "react-native-svg";
import {remCalc} from "../../helpers/utils";
import {View} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const ArrowBackIcon = () => {
    return (
        <View style={{marginLeft: EStyleSheet.value('0.5rem')}}>
            <Svg width={remCalc(8)} height={remCalc(13)} viewBox="0 0 8 13" fill="none">
                <Path d="M7 1L1 6.5L7 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
    );
};

export default ArrowBackIcon;
