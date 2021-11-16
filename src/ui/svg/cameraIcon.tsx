import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {remCalc} from '../../helpers/utils';

const CameraIcon = (invert?:boolean) => {
  return (
    <Svg
      width={remCalc(16)}
      height={remCalc(14)}
      viewBox="0 0 16 14"
      fill="none">
      <Path
          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
          fill={invert ? "white":"black"}
      />
      <Path
          d="M5.6 0L4.136 1.55556H1.6C0.72 1.55556 0 2.25556 0 3.11111V12.4444C0 13.3 0.72 14 1.6 14H14.4C15.28 14 16 13.3 16 12.4444V3.11111C16 2.25556 15.28 1.55556 14.4 1.55556H11.864L10.4 0H5.6ZM8 11.6667C5.792 11.6667 4 9.92444 4 7.77778C4 5.63111 5.792 3.88889 8 3.88889C10.208 3.88889 12 5.63111 12 7.77778C12 9.92444 10.208 11.6667 8 11.6667Z"
          fill={invert ? "white":"black"}
      />
    </Svg>
  );
};

export default CameraIcon;

