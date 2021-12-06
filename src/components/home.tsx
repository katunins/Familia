import React from "react";
import HomeIcon from "../ui/svg/home";
import {Pressable} from "react-native";
import styles from "./styles";
interface IProps {
    onPress: ()=>void
}
const HomeButtonComponent:React.FunctionComponent<IProps> = ({onPress}) => {
    return (
        <Pressable style={styles.homeButton} onPress={onPress}><HomeIcon/></Pressable>
    )
}

export default HomeButtonComponent
