import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const rem =
  width < 325
    ? 12
    : width < 380
    ? 14
    : width < 560
    ? 15
    : width < 768
    ? 17
    : width < 3000
    ? 22
    : 22;
export {rem};

