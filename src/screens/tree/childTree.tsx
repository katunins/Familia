import React from "react";
import {FlatList, View} from "react-native";
import ItemTreeComponent from "./item";
import UnionLineComponent from "./unionLine";
import {treeItemSize} from "../../config";
import {itemBadge} from "./treeParser";
import {ITreeRelative} from "../../interfaces/store";
import {useDispatch, useSelector} from "react-redux";
import {setRootUser} from "../../store/slice/tree.slice";
import {relativesSelector, rootUserSelector, userSelector} from "../../store/selectors";
import user from "../../navigation/user";

interface IProps {
    marginLeft: number
    _children: ITreeRelative[]
    spouse: ITreeRelative[]
}

/**
 * Список детей
 * @param shift - смещение слева или справа
 * @param _children - массив детей
 * @constructor
 */
const ChildTreeComponent: React.FunctionComponent<IProps> = ({marginLeft, spouse, _children}) => {
    if (_children.length === 0) return null

    const relatives = useSelector(relativesSelector)
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    return (
        <View
            style={[
                spouse.length === 0 ? {
                    alignItems: 'center'
                } : {
                    marginLeft,
                    alignSelf: 'flex-start'
                },
            ]}
        >
            <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
                <UnionLineComponent treeCount={spouse.length + 1} direction={'top'} alignItems={'center'}/>
                <UnionLineComponent treeCount={_children.length} direction={'bottom'} alignItems={'center'} verticalLine
                                    width={_children.length * treeItemSize.containerWidth}/>
            </View>
            <FlatList data={_children}
                      renderItem={({item}) =>
                          <ItemTreeComponent item={item} onPress={() => dispatch(setRootUser(item))}
                                             badge={itemBadge({item, noBrothers: true, unionArr: [...relatives, user]})}
                          />}
                      horizontal={true} scrollEnabled={false}/>
        </View>
    )
}

export default ChildTreeComponent
