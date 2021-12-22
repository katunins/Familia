import React from "react";
import {ITreePosition} from "./treeGenerator";
import {View} from "react-native";
import styles from "./styles";
import {treeItemSize} from "../../config";

interface IProps extends ITreePosition {
    treeCount: number
    direction: 'top' | 'bottom'
    verticalLine?: boolean,
    width?: number
    marginLeft?: number
}

const UnionLineComponent: React.FunctionComponent<IProps> = ({
                                                                 alignItems,
                                                                 direction,
                                                                 treeCount = 0,
                                                                 verticalLine,
                                                                 width = '100%',
                                                                 marginLeft = 0
                                                             }) => {
    if (treeCount === 0) return null
    const {containerWidth} = treeItemSize
    return (
        <View style={{width, alignItems, marginLeft}}>
            {verticalLine && direction === 'bottom' && <View style={[
                styles.verticalLine,
                {
                    marginHorizontal: containerWidth / 2,
                }
            ]}/>}
            <View style={[
                styles.horizontalUnionLine,
                {
                    width: treeCount === 1 ? 2 :
                        (alignItems === 'center'
                                ? treeItemSize.containerWidth * (treeCount - 1)
                                : '50%'
                        ),
                    marginHorizontal: alignItems === 'center' ?  0 : containerWidth / 2,
                },
                direction === 'top' ? {
                    borderTopWidth: 0,
                    borderBottomLeftRadius: alignItems === 'flex-start' ? 0 : 5,
                    borderBottomRightRadius: alignItems === 'flex-end' ? 0 : 5,
                } : {},
                direction === "bottom" ? {
                    borderBottomWidth: 0,
                    borderTopLeftRadius: alignItems === 'flex-start' ? 0 : 5,
                    borderTopRightRadius: alignItems === 'flex-end' ? 0 : 5,
                } : {},
                treeCount === 1 ? {borderWidth: 0, backgroundColor: 'grey',} : {},
            ]}
            />
            {verticalLine && direction === 'top' && <View style={[
                styles.verticalLine,
                {
                    marginHorizontal: containerWidth / 2,

                }
            ]}/>}
        </View>
    )
}

export default UnionLineComponent
