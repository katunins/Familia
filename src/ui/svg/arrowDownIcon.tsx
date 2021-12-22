import React from "react";
import Svg, { Path} from "react-native-svg";
import { remCalc } from "../../helpers/utils";

const ArrowDownIcon = () => {
  return (<Svg width={remCalc(22)} height={remCalc(13)} viewBox="0 0 22 13" fill="none">
      <Path d="M2 2L11 11L20 2" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
    </Svg>
  );
};

export default ArrowDownIcon
