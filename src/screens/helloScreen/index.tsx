import { View, Text, ImageBackground, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import BigLogoIcon from "../../ui/svg/bigLogoIcon";
import styles from "./styles";
import ArrowDownIcon from "../../ui/svg/arrowDownIcon";
import globalStyles from "../../styles/styles";

const HelloScreen = () => {
  const arrowY = useRef(new Animated.Value(0)).current;
  const maxShift = 20

  const ArrowShift = (shift = maxShift) => {
    Animated.timing(arrowY, {
      toValue: shift,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      ArrowShift(shift === maxShift ? 0: maxShift);
    });
  };

  useEffect(ArrowShift, []);
  return (
    <ImageBackground
      source={require("../../ui/images/photocamera.jpg")}
      resizeMode="cover"
      style={[styles.backgroundImageContainer, globalStyles.container]}>
      <View style={styles.bigLogo}>
        <BigLogoIcon />
      </View>
      <View style={styles.introTextWrapper}>
        <Text style={styles.introText}>
          {"Отсканируйте фотографии из семейного альбома"}
        </Text>
        <Animated.View style={{
          transform: [
            { translateY: arrowY }
          ]
        }}>
          <ArrowDownIcon />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default HelloScreen;
