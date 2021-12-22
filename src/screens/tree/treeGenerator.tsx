import React, {useCallback, useEffect, useMemo, useState} from "react";
import {LayoutChangeEvent, View} from "react-native";
import styles from "./styles";
import ItemTreeComponent from "./item";
import BrothersWrapperComponent from "./brothersWrapper";
import UnionLineComponent from "./unionLine";
import {getParentsArr, itemBadge} from "./treeParser";
import {treeItemSize} from "../../config";
import {ITreeRelative} from "../../interfaces/store";
import {useDispatch, useSelector} from "react-redux";
import {setRootUser} from "../../store/slice/tree.slice";
import {relativesSelector, userSelector} from "../../store/selectors";


export interface ITreePosition {
    alignItems: 'flex-start' | 'center' | 'flex-end'
}


interface IGetTreeElements extends ITreePosition {
    item: ITreeRelative | undefined
    level?: number
    rootUser: ITreeRelative
    spouse?: boolean
    root?: boolean
    brothers?: ITreeRelative[]
    layoutCallBack?: (event: LayoutChangeEvent, index: number) => void
    index?: number
    parentsOfRoot?: boolean
}

/**
 * Генератор древа
 * @param rootUser - центральный пользователь
 * @param unionArr - массив всех родственников для поиска
 * @param alignItems - тип древа (слева, справа, по центру)
 * @param root - главный пользователь в древе
 * @constructor
 */

const TreeGenerator: React.FunctionComponent<IGetTreeElements> =
    ({
         item,
         alignItems,
         level = -1,
         rootUser,
         spouse,
         root,
         brothers = [],
         layoutCallBack,
         index = 0,
         parentsOfRoot
     }) => {
        if (!item) return null
        const dispatch = useDispatch()
        const user = useSelector(userSelector)
        const relatives = useSelector(relativesSelector)

        // Массив елементов родителей, найденных по ID
        const parentItemsArr = useMemo(() => getParentsArr(item, [...relatives, user]), [item])

        // ширина родителей в последующем древе [0,0]
        const [parentsWidth, setParentsWidth] = useState(parentItemsArr.map(item => 0))
        // отступ ребенка слева
        const [marginLeft, setMarginLeft] = useState(0)

        // клик по элементу древа
        const onPress = useCallback(() => {
            if (item._id === rootUser?._id && !spouse) return
            dispatch(setRootUser(item))
        }, [rootUser])

        const firstElement = item._id === rootUser?._id
        level++

        //callBack function возвращающая ширину родительского элемента обратно в ребенка
        //небходимо только, если контейнер ребенка - center
        const onLayout =  useCallback((event: LayoutChangeEvent, index: number) => {
            const {width} = event.nativeEvent.layout
            if (alignItems !== 'center') return
            setParentsWidth(prevState => prevState.map((item, ind) => index === ind ? width : item))
        }, [rootUser])

        // Массив React элементов родителей
        const parentsArr = parentItemsArr.map((parent, index) =>
            <TreeGenerator item={parent} rootUser={rootUser}
                           alignItems={alignItems === 'center' ? index === 0 ? 'flex-end' : 'flex-start' : alignItems}
                           layoutCallBack={onLayout} index={index} level={level} parentsOfRoot={root}
            />)

        useEffect(() => {
            // нет смысла выравнивать ребенка, если родителей не 2
            // и их ширины равны
            if (parentsWidth.length !== 2) return
            const [left, right] = parentsWidth
            if (left === right) return
            setMarginLeft(left - right)

        }, [parentsWidth])

        useEffect(() => setMarginLeft(0), [rootUser])
        const badge = useMemo(() => !root && !spouse ?
            itemBadge({item, countDecrease: 1, noChildren: parentsOfRoot, unionArr: [...relatives, user]}) :
            undefined, [item])
        return (
            <View
                style={[styles.itemTreeContainer, {alignItems},
                    // {backgroundColor: '#' + ((1 << 24) * Math.random() | 0).toString(16)}
                ]}
                onLayout={event => layoutCallBack ? layoutCallBack(event, index) : undefined}
            >
                <View style={styles.itemTreeWrapper}>
                    {parentsArr[0] || null}
                    {parentsArr[1] || null}
                </View>
                <UnionLineComponent alignItems={alignItems} treeCount={parentsArr.length} direction={'top'}
                                    verticalLine marginLeft={marginLeft}
                                    width={alignItems === 'center' ? parentItemsArr.length * treeItemSize.containerWidth : undefined}/>

                <View style={{flexDirection: 'row', marginLeft}}>
                    <BrothersWrapperComponent alignItems={alignItems}
                                              brothers={brothers}
                    >
                        <ItemTreeComponent
                            item={item}
                            root={root && firstElement}
                            badge={badge}
                            onPress={onPress}
                        />
                    </BrothersWrapperComponent>
                </View>
            </View>
        )
    }

export default TreeGenerator
