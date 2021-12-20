import React, {useMemo} from "react";
import {ITreePosition} from "./treeGenerator";
import {FlatList, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import EmptyTreeComponent from "./empty";
import {ISplitBrothers, itemBadge, splitBrothers} from "./treeBase";

interface IProps extends ITreePosition {
    brothers: ITreeItem[]
    setRootUser: (item: ITreeItem) => void
    rootUser: ITreeItem
}

const BrothersWrapperComponent: React.FunctionComponent<IProps> =
    ({
         brothers,
         alignItems,
         children,
         setRootUser,
         rootUser
     }) => {

        const brothersArr: ISplitBrothers = useMemo(() => alignItems === 'center'
            ? splitBrothers(brothers) :
            alignItems === 'flex-end' ? {
                left: brothers,
                right: []
            } : {
                left: [],
                right: brothers
            }, [rootUser])

        const onPress = (item: ITreeItem | null) => {
            if (!item) return
            setRootUser(item)
        }
        return (
            <View style={styles.brothersWrapper}>
                {brothersArr.left.length > 0 && <FlatList
                    data={brothersArr.left}
                    renderItem={({item}) => item ?
                        <ItemTreeComponent
                            item={item} onPress={() => onPress(item)}
                            badge={itemBadge({item, brother: true})}
                        /> : <EmptyTreeComponent/>} horizontal={true} scrollEnabled={false}

                    ListFooterComponent={<View style={styles.horizontalLine}/>}
                />}

                {children}
                {brothersArr.right.length > 0 && <FlatList
                    data={brothersArr.right}
                    renderItem={({item}) => item ? <ItemTreeComponent
                        item={item} onPress={() => onPress(item)}
                        // badge={itemBadge({item, unionArr})}
                    /> : <EmptyTreeComponent/>} horizontal={true}
                    scrollEnabled={false}
                    ListHeaderComponent={<View
                        style={[styles.horizontalLine, !brothersArr.right[0] ? {opacity: 0} : {}]}/>}
                />}
            </View>
        )
    }

export default BrothersWrapperComponent
