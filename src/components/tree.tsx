import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ITreeItem} from "../screens/tree/item";
import {LayoutChangeEvent, Text, View} from "react-native";
import TreeGenerator from "../screens/tree/treeGenerator";
import styles from "../screens/tree/styles";
import {IUser} from "../interfaces/store";
import {getBrothers, getChildren, getSpouse} from "../screens/tree/treeBase";
import ChildTreeComponent from "../screens/tree/childTree";
import {treeItemSize} from "../config";

/**
 * Компонент построения древа
 * @param rootUser - центральный пользователь
 * @constructor
 */
interface IProps {
    // user: IUser
    rootUser: ITreeItem,
    setRootUser: (user: ITreeItem) => void
    spouse: ITreeItem[]
    children: ITreeItem[]
    brothers: ITreeItem[]
}

const TreeComponent: React.FunctionComponent<IProps> =
    ({
         rootUser,
         setRootUser,
         spouse,
         children,
         brothers,
     }) => {

        // ширина и отступ слева контейнера главного пользователя
        const [rootContainerWidth, setRootContainerWidth] = useState(0)
        const [rootContainerMargin, setRootContainerMargin] = useState(0)
        // Отступ слева контейнера с детьми
        const [calcMarginLeft, setCalcMarginLeft] = useState(0)

        // Устанавливает ширину контейнера главного пользователя
        const onRootWrapperLayout = useCallback((event: LayoutChangeEvent) => {
            const {width} = event.nativeEvent.layout
            if (width !== rootContainerWidth) setRootContainerWidth(width)
        }, [rootContainerWidth, rootUser])

        // высчитывает marginLeft для контейнера с детьми
        useEffect(() => {
            const childrenWidth = children.length * treeItemSize.containerWidth
            // если ширина контейнера детей шире левого контейнера root
            if (spouse.length > 0 && rootContainerWidth > 0 && rootContainerWidth) {
                const diff = childrenWidth / 2 - rootContainerWidth
                setRootContainerMargin(diff > 0 ? diff :0)
            }
            setCalcMarginLeft(rootContainerWidth - (childrenWidth / 2) > 0 ? rootContainerWidth - (childrenWidth / 2) : 0)
        }, [rootContainerWidth, rootUser])

        // useEffect(()=>{
        //     setRootContainerMargin(0)
        //     setRootContainerWidth(0)
        //     setCalcMarginLeft(0)
        // }, [rootUser])

        return (
            <View style={{alignItems: spouse.length === 0 ? 'center' : 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={[styles.itemTreeContainer, {marginLeft: rootContainerMargin}]}
                        onLayout={onRootWrapperLayout}
                    >
                        <TreeGenerator
                            item={rootUser} rootUser={rootUser} setRootUser={setRootUser}
                            alignItems={spouse.length > 0 ? 'flex-end' : 'center'} root brothers={brothers}
                        />
                    </View>
                    {spouse.length > 0 &&
                    <View
                        style={[styles.itemTreeContainer]}>
                        <TreeGenerator item={spouse[0]} rootUser={spouse[0]} setRootUser={setRootUser}
                                       alignItems={'flex-start'} spouse/>
                    </View>
                    }
                </View>
                {/*<Text>rootContainerWidth = {rootContainerWidth}</Text>*/}
                {/*<Text>rootContainerMargin = {rootContainerMargin}</Text>*/}
                {/*<Text>calcMarginLeft = {calcMarginLeft}</Text>*/}
                <ChildTreeComponent marginLeft={calcMarginLeft} _children={children}
                                    setRootUser={setRootUser} spouse={spouse}/>
            </View>
        )
    }

export default TreeComponent
