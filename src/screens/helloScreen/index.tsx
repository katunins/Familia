import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import globalStyles from "../../styles/styles";
import styles from "./styles";
import ArrowDownIcon from "../../ui/svg/arrowDownIcon";

const HelloScreen = () => {

    return (
      <View style={[globalStyles.containerColor, globalStyles.container, globalStyles.verticalCentre]}>
        <Text style={globalStyles.title}>Familia</Text>
          {/*@ts-ignore*/}
          <FastImage style={styles.image} source={require("../../ui/images/retroCamera.jpg")} resizeMode={'contain'}/>
         <Text style={styles.offer}>Отсканируйте фотографии,{'\n'}отметьте родтсвенников{'\n'}и поделитесь с семьей</Text>
        <View style={styles.introTextWrapper}>
            <ArrowDownIcon />
        </View>
      </View>
  );
};

export default HelloScreen;
