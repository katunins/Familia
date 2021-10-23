import React from "react";
import Svg, {Circle, Path} from "react-native-svg";
import { remCalc } from "../../helpers/utils";

interface IProps {
    checked?:boolean
}

const CheckIcon:React.FunctionComponent<IProps> = ({checked}) => {
  return (
    <Svg width={remCalc(18)} height={remCalc(18)} viewBox="0 0 18 18" fill="none">
        <Path d="M17 9C17 4.58333 13.4167 1 9 1C4.58333 1 1 4.58333 1 9C1 13.4167 4.58333 17 9 17C13.4167 17 17 13.4167 17 9Z" stroke="black" stroke-miterlimit="10"/>
        {checked && <Path d="M13 6L7.4 12L5 9.6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>}
    </Svg>
  );
};

export default CheckIcon;
