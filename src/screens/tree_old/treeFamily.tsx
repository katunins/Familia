import React from "react";
import {FlatList, View, ViewStyle} from "react-native";
import {ITree, ITreeItem, ITreeRoot} from "./tree";
import {ITreeElementPosition} from "./wrapperLine";
import ItemTreeComponent from "./item";

interface IProps extends ITreeElementPosition{
    treeElement: {

    }
}
const TreeFamilyComponent:React.FunctionComponent<IProps> = ({position,treeElement}) => {
    const alignItems: ViewStyle['alignItems'] = position === 'center' ? 'center' : position === 'left' ? 'flex-end' : 'flex-start'
    const {item, parents, brothers}=treeElement
    return (
        <View style={{alignItems}}>
            <FlatList data={parents}
                      renderItem={({item})=><ItemTreeComponent item={item.parent}/>}
                      horizontal={true} scrollEnabled={false}/>
            <ItemTreeComponent item={item}/>
        </View>
    )
}
export default TreeFamilyComponent
