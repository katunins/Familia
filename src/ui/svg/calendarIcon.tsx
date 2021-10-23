import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {remCalc} from '../../helpers/utils';

const CalendarIcon = () => {
    return (
        <Svg
            width={remCalc(9)}
            height={remCalc(10)}
            viewBox="0 0 9 10"
            fill="none">
            <Path
                d="M8.1 0.909091H7.65V0H6.75V0.909091H2.25V0H1.35V0.909091H0.9C0.405 0.909091 0 1.31818 0 1.81818V9.09091C0 9.59091 0.405 10 0.9 10H8.1C8.595 10 9 9.59091 9 9.09091V1.81818C9 1.31818 8.595 0.909091 8.1 0.909091ZM8.1 9.09091H0.9V3.18182H8.1V9.09091Z"
                fill="black"/>
        </Svg>
    );
};

export default CalendarIcon;
