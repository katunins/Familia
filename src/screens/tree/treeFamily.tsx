import React from "react";
import {View, ViewStyle} from "react-native";
import {ITree, ITreeItem, ITreeRoot} from "./tree";
import {ITreeElementPosition} from "./wrapperLine";
import ItemTreeComponent from "./item";

interface IProps extends ITreeElementPosition{
    treeElement: ITreeRoot[]
}
const TreeFamilyComponent:React.FunctionComponent<IProps> = ({position,treeElement}) => {
    const alignItems: ViewStyle['alignItems'] = position === 'center' ? 'center' : position === 'left' ? 'flex-end' : 'flex-start'
    // const {item, parents, brothers}=treeElement
    return (
        <View style={{alignItems}}>
            <ItemTreeComponent item={treeElement[0].item}/>
        </View>
    )
}
export default TreeFamilyComponent
