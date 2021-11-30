import React from "react";
import {FlatList, View, ViewStyle} from "react-native";
import ItemTreeComponent from "./item";
import {treeItemSize} from "../../config";
import WrapperLine, {ITreeElementPosition} from "./wrapperLine";
import VerticalLineComponent from "./verticalLine";
import {ITreeItem} from "./tree";
import TreeEmptyElement from "./treeEmpty";

interface IProps extends ITreeElementPosition {
    item: {
        parent: ITreeItem
        grandParents: ITreeItem[]
    }
}

const FamilyElemComponent: React.FunctionComponent<IProps> = ({position, item}) => {
    let alignItems: ViewStyle['alignItems']
    switch (position) {
        case 'center':
            alignItems = 'center'
            break
        case 'left':
            alignItems = 'flex-end'
            break
        case 'right':
            alignItems = 'flex-start'
            break
    }
    return (
        <View style={{alignItems: alignItems, justifyContent: 'flex-end', minWidth: 2*(treeItemSize.containerWidth + treeItemSize.marginHorizontal*2)}}>
            <FlatList data={item.grandParents}
                      renderItem={({item}) => <ItemTreeComponent item={item}/>}
                      scrollEnabled={false} horizontal={true} style={{flexDirection: 'row'}}
                      ListHeaderComponent={position === 'right' ? <TreeEmptyElement/> : undefined}
                      ListFooterComponent={position === 'left' ? <TreeEmptyElement/> : undefined}
            />

            <View style={{
                alignItems: 'stretch',
                marginHorizontal: (treeItemSize.containerWidth / 2 + treeItemSize.marginHorizontal),
            }}>
                <WrapperLine items={item.grandParents.length} type={'top'} position={position}/>
                {item.grandParents.length > 0 && <VerticalLineComponent alignItems={alignItems}/>}
            </View>
                <ItemTreeComponent item={{...item.parent}}/>
        </View>
    )
}

export default FamilyElemComponent
