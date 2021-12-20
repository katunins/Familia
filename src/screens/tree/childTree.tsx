import React from "react";
import {FlatList, Text, View} from "react-native";
import ItemTreeComponent, {ITreeItem} from "./item";
import UnionLineComponent from "./unionLine";
import {treeItemSize} from "../../config";
import {itemBadge} from "./treeBase";

interface IProps {
    marginLeft: number
    _children: ITreeItem[]
    setRootUser: (item: ITreeItem) => void
    spouse: ITreeItem[]
}

/**
 * Список детей
 * @param shift - смещение слева или справа
 * @param _children - массив детей
 * @constructor
 */
const ChildTreeComponent: React.FunctionComponent<IProps> = ({marginLeft, spouse, _children, setRootUser}) => {
    if (_children.length === 0) return null
    return (
        <View
            style={[
                spouse.length === 0 ? {
                    alignItems: 'center'
                } : {
                    marginLeft,
                    alignSelf: 'flex-start'
                },
            ]}
        >
            <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
                <UnionLineComponent treeCount={spouse.length + 1} direction={'top'} alignItems={'center'}/>
                <UnionLineComponent treeCount={_children.length} direction={'bottom'} alignItems={'center'} verticalLine width={_children.length*treeItemSize.containerWidth}/>
            </View>
            <FlatList data={_children}
                      renderItem={({item}) =>
                          <ItemTreeComponent item={item} onPress={() => setRootUser(item)}
                                             badge={itemBadge({item, brother:true})}
                          />}
                      horizontal={true} scrollEnabled={false}/>
        </View>
    )
}

export default ChildTreeComponent
