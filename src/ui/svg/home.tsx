import React from "react";
import Svg, {Path} from "react-native-svg";
import {remCalc} from "../../helpers/utils";

const HomeIcon: React.FunctionComponent = () => {
    return (
        <Svg width={remCalc(22)} height={remCalc(19)} viewBox="0 0 22 19" fill="none">
            <Path d="M8.8 19V12.2941H13.2V19H18.7V10.0588H22L11 0L0 10.0588H3.3V19H8.8Z" fill="black"/>
        </Svg>

    )
}

export default HomeIcon
