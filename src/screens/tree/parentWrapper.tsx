import React from "react";
import {ITreeElementPosition} from "./wrapperLine";
import {FlatList} from "react-native";
import ItemTreeComponent from "./item";
import {ITreeItem, ITreeRoot} from "./tree";
import {useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../../store/selectors";

interface IProps extends ITreeElementPosition {
    parents: ITreeItem['parents']
}

/**
 * принимает объект ID родителей
 * @param parents
 * @param position
 * @constructor
 */
const ParentsWrapperComponent: React.FunctionComponent<IProps> = ({parents, position}) => {
    const parentsArr: ITreeItem[] = []
    Object.keys(parents).map(key => {
        if (parents[key] !== '') parentsArr.push()
    })
    return (
        <FlatList
            data={parentsArr}
            renderItem={({item}) => <ItemTreeComponent item={item}/>}
            contentContainerStyle={{flexDirection: position === 'left' || position === 'center' ? 'row' : 'row-reverse'}}
            scrollEnabled={false}
        />
    )
}

export default ParentsWrapperComponent
