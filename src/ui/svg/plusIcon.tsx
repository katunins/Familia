import React from "react";
import Svg, { Path } from "react-native-svg";
import { remCalc } from "../../helpers/utils";

const PlusIcon = () => {
  return (
    <Svg width={remCalc(12)} height={remCalc(12)} viewBox="0 0 12 12" fill="none">
      <Path
          d="M11 6H1M6 1V11V1Z" stroke="black" strokeWidth="2" strokeLinecap={"round"} strokeLinejoin={"round"}/>
    </Svg>
  );
};

export default PlusIcon;
