import React from "react";
import {ITreeItem} from "./tree";
import {FlatList, View} from "react-native";
import ItemTreeComponent from "./item";
import {treeItemSize} from "../../config";
import {ITreeElementPosition} from "./wrapperLine";
import HorizontalLineComponent from "./horizontalLine";

interface IProps extends ITreeElementPosition {
    brothers: ITreeItem[]
    shift?: 'left' | 'right' | 'none'
}

const BrothersLineComponent: React.FunctionComponent<IProps> = ({brothers, position, shift = 'none'}) => {
    return <View style={{flexDirection: 'row'}}>
        {shift === 'left' && <View style={{
            width: treeItemSize.containerWidth,
            height: treeItemSize.height,
            marginHorizontal: treeItemSize.marginHorizontal
        }}/>}
        <FlatList
            // style={{marginTop: -20}}
            // contentContainerStyle={{backgroundColor: 'green'}}
            data={brothers}
            renderItem={({item})=><ItemTreeComponent item={item}/>} horizontal={true} scrollEnabled={false}
            ListHeaderComponent={position === 'right' ?
                <HorizontalLineComponent transparent={brothers.length === 0}/> : undefined}
            ListFooterComponent={position === 'left' ?
                <HorizontalLineComponent transparent={brothers.length === 0}/> : undefined}
        />
        {shift === 'right' && <View style={{
            width: treeItemSize.containerWidth,
            height: treeItemSize.height,
            marginHorizontal: treeItemSize.marginHorizontal
        }}/>}
    </View>
}

export default BrothersLineComponent
