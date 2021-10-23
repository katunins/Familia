import React from "react";
import Svg, { Path } from "react-native-svg";
import { remCalc } from "../../helpers/utils";
interface IProps {
    color:string
}
const PlusTabIcon:React.FunctionComponent<IProps> = ({ color }) => {
  return (<Svg width={remCalc(26)} height={remCalc(26)} viewBox="0 0 26 26" fill="none">
          <Path d="M25 13C25 6.375 19.625 1 13 1C6.375 1 1 6.375 1 13C1 19.625 6.375 25 13 25C19.625 25 25 19.625 25 13Z" stroke={color} stroke-width="4" stroke-miterlimit="10"/>
          <Path d="M18 13H8M13 8V18V8Z" stroke={color} stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default PlusTabIcon;
