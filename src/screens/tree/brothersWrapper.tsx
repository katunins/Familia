import React, {useMemo} from "react";
import {ITreePosition} from "./treeGenerator";
import {FlatList, View} from "react-native";
import styles from "./styles";
import EmptyTreeComponent from "./empty";
import {ISplitBrothers, itemBadge, splitBrothers} from "./treeParser";
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, rootUserSelector, userSelector} from "../../store/selectors";
import {setRootUser} from "../../store/slice/tree.slice";
import {ITreeRelative} from "../../interfaces/store";
import ItemTreeComponent from "./item";

interface IProps extends ITreePosition {
    brothers: ITreeRelative[]
}

const BrothersWrapperComponent: React.FunctionComponent<IProps> =
    ({
         brothers,
         alignItems,
         children,
     }) => {
        const rootUser = useSelector(rootUserSelector)
        const user = useSelector(userSelector)
        const relatives = useSelector(relativesSelector)

        const dispatch = useDispatch()

        const brothersArr: ISplitBrothers = useMemo(() => alignItems === 'center'
            ? splitBrothers(brothers) :
            alignItems === 'flex-end' ? {
                left: brothers,
                right: []
            } : {
                left: [],
                right: brothers
            }, [rootUser])

        const onPress = (item: ITreeRelative | null) => {
            if (!item) return
            dispatch(setRootUser(item))
        }
        return (
            <View style={styles.brothersWrapper}>
                {brothersArr.left.length > 0 && <FlatList
                    data={brothersArr.left}
                    renderItem={({item}) => item ?
                        <ItemTreeComponent
                            item={item} onPress={() => onPress(item)}
                            badge={itemBadge({item, noBrothers: true, unionArr:[...relatives, user]})}
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
