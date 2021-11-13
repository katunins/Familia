import React, {useState} from "react";
import styles from "./styles";
import {Dimensions, FlatList, Platform, Pressable, Text, View} from "react-native";
import SeparatorComponent from "./separator";
import {TouchableOpacity} from "react-native-gesture-handler";
import DotsIcon from "../ui/svg/dots";
import dotsMenu from "./dotsMenu";

export interface DotMenuElem {
    title: string
    icon?: React.ReactElement
    callBack: () => void
}

interface IProps {
    menuArr: DotMenuElem[]
    enable?: boolean
}

const DotsMenuComponent: React.FunctionComponent<IProps> =
    ({menuArr, enable = false}) => {

        const [bottomShift, setBottomShift] = useState(0)

        const dotsButton = (event: { nativeEvent: { pageY: number } }) => {
            const bottom = event.nativeEvent.pageY > (Dimensions.get('window').height / 2) ? 25 : -100
            // const bottom = -165
            setBottomShift(bottomShift === 0 ? bottom : 0)
        }

        return (
            <>
                <Pressable onPress={dotsButton} hitSlop={32} style={styles.dotsMenuButton}>
                    <DotsIcon/>
                </Pressable>
                {bottomShift !== 0 && <FlatList
                    style={[styles.dotsMenu, {bottom: bottomShift}]}
                    data={menuArr}
                    listKey={'inner'}
                    ItemSeparatorComponent={() => <SeparatorComponent/>}
                    renderItem={({item}) =>
                        Platform.OS === 'ios' ?
                            <Pressable
                                onPress={() => {
                                    setBottomShift(0)
                                    item.callBack()
                                }}>
                                <View style={styles.noteComponentDotsLineWrapper}>
                                    <Text style={styles.noteComponentDotsLineText}>{item.title}</Text>
                                    {item.icon && item.icon}
                                </View>
                            </Pressable>
                            :
                            <TouchableOpacity
                                onPressIn={() => {
                                    setBottomShift(0)
                                    item.callBack()
                                }}>
                                <View style={styles.noteComponentDotsLineWrapper}>
                                    <Text style={styles.noteComponentDotsLineText}>{item.title}</Text>
                                    {item.icon && item.icon}
                                </View>
                            </TouchableOpacity>}
                />}
            </>
        )
    }
export default DotsMenuComponent
