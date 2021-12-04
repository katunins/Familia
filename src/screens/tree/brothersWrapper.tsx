import React from "react";
import {ITreePosition} from "./treeGenerator";
import {FlatList, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent, {ITreeItem} from "./item";
import {ISplitBrothers, splitBrothers} from "../../helpers/tree";

interface IProps extends ITreePosition {
    brothers: ITreeItem[]
}

const BrothersWrapperComponent: React.FunctionComponent<IProps> = ({brothers, alignItems, children}) => {
    const brothersArr: ISplitBrothers = splitBrothers(brothers)

    return (
        <View style={styles.brothersWrapper}>
            {/*<FlatList*/}
            {/*    data={alignItems === 'flex-end' ? brothers : brothersArr.left}*/}
            {/*    renderItem={({item}) => <ItemTreeComponent item={item}/>} horizontal={true} scrollEnabled={false}/>*/}

            {brothers.length > 0 && alignItems==='flex-end' && <View style={{width: 600, height: 86, backgroundColor: 'red'}}/>}
            {children}
            {/*<FlatList*/}
            {/*    data={alignItems === 'flex-start' ? brothers : brothersArr.right}*/}
            {/*    renderItem={({item}) => <ItemTreeComponent item={item}/>} horizontal={true} scrollEnabled={false}/>*/}
        </View>
    )
}

export default BrothersWrapperComponent
