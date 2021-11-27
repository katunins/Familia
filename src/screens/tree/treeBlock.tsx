import {FlatList, View} from "react-native";
import ItemTreeComponent from "./item";
import React from "react";
import {ITreeItem} from "./tree";
import TreeElementComponent, {ITreeElementPosition} from "./treeElement";
import WrapperLine from "./wrapperLine";
import VerticalLineComponent from "./verticalLine";
import {getTreePosition} from "../../helpers/utils";

export interface ITreeRoot {
    item: ITreeItem
    parents: {
        parent: ITreeItem
        grandParents: ITreeItem[]
    }[]
    brothers: ITreeItem[]
}
interface IProps {
    roots: ITreeRoot[]
    children: ITreeItem[]
}

const TreeBlock: React.FunctionComponent<IProps> = ({roots, children}) => {
    return (
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                {roots.map((item, index)=>
                    <View style={{marginHorizontal: 20, justifyContent: 'flex-end'}}>
                        <TreeElementComponent element={item} position={getTreePosition(index, roots.length)} key={index}/>
                    </View>
                )}
            </View>
            {children.length > 0 &&
            <View style={{left: 0}}>
                <WrapperLine items={roots.length} type={'top'} position={'center'}/>
                <VerticalLineComponent/>
                <WrapperLine items={children.length} type={'bottom'} position={'center'}/>
                {/*@ts-ignore*/}
                <FlatList data={children} renderItem={({item}) => <ItemTreeComponent item={item}/>}
                          horizontal={true}/>
            </View>}
        </View>
    )
}

export default TreeBlock
