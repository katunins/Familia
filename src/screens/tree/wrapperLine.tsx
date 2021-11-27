import {StyleProp, View, ViewStyle} from "react-native";
import {treeItemSize} from "../../config";
import React from "react";
import {ITreeElementPosition} from "./treeElement";

interface IProps extends ITreeElementPosition {
    items: number
    type: 'top' | 'bottom'
    extra?: boolean
}

const WrapperLine: React.FunctionComponent<IProps> = ({items, type, position, extra}) => {

    let style: StyleProp<ViewStyle> = {height: 10, alignSelf: 'center'}
    if (extra) {
        if (position === 'left') style.alignSelf = 'flex-end'
        if (position === 'right') style.alignSelf = 'flex-start'
    }
    switch (type) {
        case 'top':
            style.borderBottomLeftRadius = treeItemSize.borderRadius
            style.borderBottomRightRadius = treeItemSize.borderRadius
            if (position === 'left') style.borderBottomRightRadius = 0
            if (position === 'right') style.borderBottomLeftRadius = 0
            break

        case 'bottom':
            style.borderTopLeftRadius = treeItemSize.borderRadius
            style.borderTopRightRadius = treeItemSize.borderRadius
            break
    }

    if (items === 0) return null
    if (items === 1) {
        style = {...style, width: 1, backgroundColor: 'grey'}
    } else {
        let width = (treeItemSize.containerWidth + treeItemSize.marginHorizontal * 2) * items - treeItemSize.containerWidth + treeItemSize.marginHorizontal * 2
        style = {
            ...style,
            width: width,
            borderColor: 'grey',
            borderLeftWidth: 1,
            borderRightWidth: 1
        }
        if (position === 'left') style.marginLeft = treeItemSize.LRShift
        if (position === 'right') style.marginRight = treeItemSize.LRShift


        if (type === 'top') style.borderBottomWidth = 1; else style.borderTopWidth = 1
    }
    return <View style={{
        flexDirection: 'row',
        justifyContent: position === 'center' ? 'center' : (position === 'left' ? 'flex-end' : 'flex-start'),
        alignItems: 'flex-end'
    }}>
        {extra && position === 'right' &&
        <View style={{width: treeItemSize.containerWidth, height: 1, backgroundColor: 'grey'}}/>}
        <View style={style}/>
        {extra && position === 'left' &&
        <View style={{width: treeItemSize.containerWidth, height: 1, backgroundColor: 'grey'}}/>}
    </View>
}

export default WrapperLine
