import React, {useState} from "react";
import styles from "./styles";
import {Dimensions, FlatList, Pressable, Text, View} from "react-native";
import SeparatorComponent from "./separator";
import DotsIcon from "../ui/svg/dots";

export interface DotMenuElem {
    title: string
    icon?: React.ReactElement
    callBack: () => void
}

const DotsMenuComponent: React.FunctionComponent<{menuArr: DotMenuElem[]}> =
    ({menuArr}) => {

        const [bottomShift, setBottomShift] = useState(0)

        const dotsButton = (event: { nativeEvent: { pageY: number } }) => {
            const bottom = event.nativeEvent.pageY > (Dimensions.get('window').height / 2) ? 25 : -100
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
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <SeparatorComponent/>}
                    renderItem={({item}) =>
                        <Pressable
                            onPress={() => {
                                setBottomShift(0)
                                item.callBack()
                            }}
                            hitSlop={32}
                        >
                            <View style={styles.noteComponentDotsLineWrapper}>
                                <Text style={styles.noteComponentDotsLineText}>{item.title}</Text>
                                {item.icon && item.icon}
                            </View>
                        </Pressable>
                    }
                />}
            </>
        )
    }
export default DotsMenuComponent
