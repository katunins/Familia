import React from "react";
import {ITreeElementPosition} from "./wrapperLine";
import {FlatList, Text, View} from "react-native";
import ItemTreeComponent from "./item";
import {ITreeItem} from "./tree";
import HorizontalLineComponent from "./horizontalLine";
import {getParents} from "../../helpers/tree";

interface IProps extends ITreeElementPosition {
    item: {
        item: ITreeItem
        brothers: ITreeItem[]
    }
    width: number
    unionArr: ITreeItem[]
}

interface ILoopLine extends ITreeElementPosition {
    item: ITreeItem
    unionArr: ITreeItem[]
}

const LoopLineComponent: React.FunctionComponent<ILoopLine> = ({item, unionArr, position}) => {
    let parentsArr = getParents({child: item, unionArr})
    return (
        <View style={{flexDirection: position === 'left' || position === 'center' ? 'row' : 'row-reverse'}}>
            {parentsArr.map((item, index) => <ItemTreeComponent item={item} key={index}/>)}
        </View>
    )

}

const RootWrapperComponent: React.FunctionComponent<IProps> = ({item, position, width, unionArr}) => {
    const emptyArr = new Array(width - item.brothers.length).fill(null)
    return (

        <View style={{
            flexDirection: 'column-reverse',
            alignItems: position === 'left' || position === 'center' ? 'flex-end' : 'flex-start',
            justifyContent: 'flex-start'
        }}>
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

            <LoopLineComponent item={item.item} unionArr={unionArr} position={position}/>
        </View>
    )
}

export default RootWrapperComponent
