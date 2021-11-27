import {FlatList, Text, View, ViewStyle} from "react-native";
import ItemTreeComponent from "./item";
import {treeItemSize} from "../../config";
import React from "react";
import TreeEmptyElement from "./treeEmpty";
import VerticalLineComponent from "./verticalLine";
import WrapperLine from "./wrapperLine";
import {ITreeRoot} from "./treeBlock";
import BrothersLineComponent from "./brothersLine";
import FamilyElemComponent from "./familyElem";
import {ITreeItem} from "./tree";
import {getTreePosition} from "../../helpers/utils";

export interface ITreeElementPosition {
    position?: 'center' | 'left' | 'right'
}

interface IProps extends ITreeElementPosition {
    element: ITreeRoot,
}

/**
 * Компонент дерева одного Root
 * @param element - данные родственников
 * @param position - размещение слева / справа
 * @constructor
 */
const TreeElementComponent: React.FunctionComponent<IProps> =
    ({element, position = 'center'}) => {
        let alignItems: ViewStyle['alignItems']
        switch (position) {
            case 'center':
                alignItems = 'center'
                break
            case 'left':
                alignItems = 'flex-end'
                break
            case 'right':
                alignItems = 'flex-start'
                break
        }
        // Если root один без жены, то распределим братьев симмитрично
        const centeredBrothers = {
            left: [],
            right: []
        }
        if (element.brothers.length > 0 && position === 'center') {
            const minHalf = Math.floor(element.brothers.length / 2)
            // @ts-ignore
            centeredBrothers.left = element.brothers.slice(0, minHalf)
            // @ts-ignore
            centeredBrothers.right = element.brothers.slice(minHalf)
        }
        return (
            <View style={{alignItems: alignItems}}>

                {/*Линия дедов с прадедами*/}
                <View style={[{flex: 1, alignItems: 'stretch'}]}>
                    <FlatList data={element.parents}
                              // contentContainerStyle={{alignItems: 'flex-end'}}
                              renderItem={({item, index}) =>
                                  <FamilyElemComponent
                                      item={item}
                                  position={getTreePosition(index, element.parents.length)}
                                      // position={position === 'left' ? (index === 0 ? position : 'center'):(index === 0 ? 'center' : position)}
                                  />}
                              horizontal={true} scrollEnabled={false}
                    />
                    <View style={{
                        alignItems: 'stretch',
                        marginHorizontal: (treeItemSize.containerWidth / 2 + treeItemSize.marginHorizontal),
                    }}>
                        <WrapperLine items={element.parents.length} type={'top'} position={position} extra={true}/>
                        {element.parents.length > 0 && <VerticalLineComponent alignItems={alignItems}/>}
                    </View>
                </View>

                {/*Линия Root с братьями*/}
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {position === 'left' && <BrothersLineComponent brothers={element.brothers} position={position}/>}
                    {position === 'center' &&
                    <BrothersLineComponent brothers={centeredBrothers.left} position={'left'}
                                           shift={centeredBrothers.left.length < centeredBrothers.right.length ? 'left' : 'none'}/>}
                    <ItemTreeComponent item={{...element.item}}/>
                    {position === 'center' &&
                    <BrothersLineComponent brothers={centeredBrothers.right} position={'right'}
                                           shift={centeredBrothers.left.length > centeredBrothers.right.length ? 'right' : 'none'}/>}
                    {position === 'right' && <BrothersLineComponent brothers={element.brothers} position={position}/>}

                </View>

            </View>)
    }

export default TreeElementComponent
