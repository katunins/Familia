import React from "react";
import {ITreePosition} from "./treeGenerator";
import {FlatList, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import {getChildren, ISplitBrothers, itemBadge, splitBrothers} from "../../helpers/tree";
import EmptyTreeComponent from "./empty";

interface IProps extends ITreePosition {
    brothers: ITreeItem[]
    setRootUser: (item: ITreeItem) => void
    unionArr: ITreeItem[]
}

const BrothersWrapperComponent: React.FunctionComponent<IProps> =
    ({
         brothers,
         alignItems,
         children,
         setRootUser,
         unionArr
     }) => {

        const brothersArr: ISplitBrothers = alignItems === 'center' ? splitBrothers(brothers) :
            alignItems === 'flex-end' ? {
                left: brothers,
                right: []
            } : {
                left: [],
                right: brothers
            }

        const onPress = (item: ITreeItem | null) => {
            if (!item) return
            setRootUser(item)
        }
        return (
            <View style={styles.brothersWrapper}>
                {brothersArr.left.length > 0 && <FlatList
                    data={brothersArr.left}
                    renderItem={({item}) => item ? <ItemTreeComponent
                        item={item} onPress={() => onPress(item)}
                        badge={itemBadge({item, unionArr})}
                    />: <EmptyTreeComponent/>} horizontal={true} scrollEnabled={false}/>}

                {children}
                {brothersArr.right.length > 0 && <FlatList
                    data={brothersArr.right}
                    renderItem={({item}) => item ? <ItemTreeComponent
                        item={item} onPress={() => onPress(item)}
                        badge={itemBadge({item, unionArr})}
                    />:<EmptyTreeComponent/>} horizontal={true} scrollEnabled={false}/>}
            </View>
        )
    }

export default BrothersWrapperComponent
