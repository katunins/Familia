import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import TreeBlock, {ITreeProps, ITreeRoot} from "./treeBlock";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import {relativesSelector, userSelector} from "../../store/selectors";
import {useSelector} from "react-redux";
import {IRelative, IUser} from "../../interfaces/store";

export interface ITreeItem {
    userPic: string
    name: string
    type?: string
    id?: string
    onPress?: () => void
}

const TreeScreen: React.FunctionComponent<NativeStackScreenProps<RootStackParamList, 'TreeScreen'>> =
    ({
         route,
         navigation
     }) => {
        const user = useSelector(userSelector)
        const relatives = useSelector(relativesSelector)

        const [tree, setTree] = useState<ITreeProps>({
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
            buildTree({relatives, user})
        }, [])

        type IBuildTree = {
            relatives: IRelative[]
            user: IUser
            rootId: string
        }
        const buildTree = ({relatives, user, rootId = user._id}:IBuildTree) => {

            console.log(relatives)

            const unionArr = [...relatives, user]

         // найдем детей
            const children = unionArr.filter(item=>item.parents.father === rootId).map((item)=>userToTree(item))
            setTree({...tree, children})
        }

        const userToTree = (user: IRelative | IUser) => {
            return {
                id: user._id,
                name: user.name,
                userPic: user.userPic
            }
        }

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
