import React from "react";
import VerticalLineComponent from "./verticalLine";
import {FlatList, View} from "react-native";
import styles from "./styles";
import HorizontalUnionLineComponent from "./horizontalLine";
import ItemTreeComponent, {ITreeItem} from "./item";
import {ITreePosition} from "./treeGenerator";
interface IProps {
    shift: number
    _children: ITreeItem[]
}

/**
 * Список детей
 * @param shift - смещение слева или справа
 * @param _children - массив детей
 * @constructor
 */
const ChildTreeComponent:React.FunctionComponent<IProps> = ({shift, _children}) => {
    if (_children.length === 0) return null
    return (
        <View style={[shift < 0 ? {marginRight: shift} : {marginLeft: shift}, {alignItems: 'center'}]}>
            <VerticalLineComponent height={7} alignItems={'center'}/>
            <View style={[styles.itemTreeWrapper, {width: '50%'}]}>
                <HorizontalUnionLineComponent
                    alignItems={'center'} invertDirection/>
            </View>
            <FlatList data={_children} renderItem={({item}) => <ItemTreeComponent item={item}/>} horizontal={true}
                      scrollEnabled={false}/>
        </View>
    )
}

export default ChildTreeComponent
