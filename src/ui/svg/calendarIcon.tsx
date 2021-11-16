import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {remCalc} from '../../helpers/utils';

const CalendarIcon = () => {
    return (
        <Svg
            width={remCalc(13)}
            height={remCalc(14)}
            viewBox="0 0 13 14"
            fill="none">
            <Path d="M11.7 1.27273H11.05V0H9.75V1.27273H3.25V0H1.95V1.27273H1.3C0.585 1.27273 0 1.84545 0 2.54545V12.7273C0 13.4273 0.585 14 1.3 14H11.7C12.415 14 13 13.4273 13 12.7273V2.54545C13 1.84545 12.415 1.27273 11.7 1.27273ZM11.7 12.7273H1.3V4.45455H11.7V12.7273Z" fill="black"/>
        </Svg>
    );
};

export default CalendarIcon;
