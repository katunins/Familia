import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import TreeBlock, {ITreeRoot} from "./treeBlock";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {userSelector} from "../../store/selectors";
import {useSelector} from "react-redux";

export interface ITreeItem {
    userPic: string
    name: string
    type?: string
    id?: string
    onPress?: () => void
}

interface IRoots {
    roots: ITreeRoot[]
    children: ITreeItem[]
}

const TreeScreen: React.FunctionComponent<NativeStackScreenProps<RootStackParamList, 'TreeScreen'>> = ({
                                                                                                           route,
                                                                                                           navigation
                                                                                                       }) => {

    const user = useSelector(userSelector)
    const [tree, setTree] = useState<IRoots>({
        roots: [
            {
                item: {
                    userPic: user.userPic,
                    name: user.name
                },
                parents: [],
                brothers: []
            }
        ],
        children: []
    })

    useEffect(() => {
        navigation.setOptions({headerTitle: tree.roots[0].item.name, headerShown: true})
    }, [])

    return (
        <ScrollView style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
                    showsHorizontalScrollIndicator={false}>
            <ScrollView centerContent={true} showsVerticalScrollIndicator={false}>
                {/*@ts-ignore*/}
                <TreeBlock roots={tree.roots} children={tree.children}/>
            </ScrollView>
        </ScrollView>
    )
}
export default TreeScreen
