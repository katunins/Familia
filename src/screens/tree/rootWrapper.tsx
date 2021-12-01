import React from "react";
import {ITreeElementPosition} from "./wrapperLine";
import {FlatList, View, ViewStyle} from "react-native";
import styles from "./styles";
import ItemTreeComponent from "./item";
import {ITreeItem, ITreeRoot} from "./tree";
import HorizontalLineComponent from "./horizontalLine";
import TreeEmptyElement from "./treeEmpty";
import ParentsWrapperComponent from "./parentWrapper";
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";
import {IRelative, IUser} from "../../interfaces/store";
import {itemFromUser} from "../../helpers/treeBuilder";

interface IProps extends ITreeElementPosition {
    item: ITreeRoot
    width: number
}

const RootWrapperComponent: React.FunctionComponent<IProps> = ({item, brothers, position, width}) => {
    const emptyArr = new Array(width - item.brothers.length).fill(null)
    return (
        <View style={{
            flexDirection: 'column-reverse',
            alignItems: position === 'left' || position === 'center' ? 'flex-end' : 'flex-start'
        }}>
            {/*Пользователь и братья*/}
            <FlatList
                data={[...item.brothers, ...emptyArr]}
                ListFooterComponent={() =>
                    <View style={{flexDirection: 'row'}}>
                        {item.brothers.length > 0 && <HorizontalLineComponent/>}
                        <ItemTreeComponent item={item.item}/>
                    </View>
                }
                renderItem={({item}) => <ItemTreeComponent item={item}/>}
                contentContainerStyle={{flexDirection: position === 'left' || position === 'center' ? 'row' : 'row-reverse'}}
                scrollEnabled={false}
            />
            {/*Родители*/}
            <ParentsWrapperComponent parents={} position={position}/>
        </View>
    )
}

export default RootWrapperComponent
