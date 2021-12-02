import React from "react";
import {ITreeElementPosition} from "./wrapperLine";
import {FlatList, View} from "react-native";
import ItemTreeComponent from "./item";
import HorizontalLineComponent from "./horizontalLine";
import {itemFromUser} from "../../helpers/tree";
import {ITreeItem} from "./tree";
interface IProps extends ITreeElementPosition{
    item: {
        item: ITreeItem
        brothers: ITreeItem[]
    }
}
const TreeRootLineComponent:React.FunctionComponent<IProps> = ({item, position}) => {
    return (
        <View style={{flexDirection: position === 'left' || position === 'center' ? 'row-reverse' : 'row'}}>
            {/*<FlatList data={item.brothers}*/}
            {/*          renderItem={({item}) => <ItemTreeComponent item={item}/>}*/}
            {/*          horizontal={true} scrollEnabled={false}*/}
            {/*          ListFooterComponent={HorizontalLineComponent}*/}
            {/*/>*/}
            <ItemTreeComponent item={item.item}/>
            {item.brothers.length > 0 && <View style={{flexDirection: 'row'}}>
                {item.brothers.map((item, index)=><ItemTreeComponent item={item} key={index}/>)}
                <HorizontalLineComponent/>
            </View>}
        </View>
    )
}
export default TreeRootLineComponent
