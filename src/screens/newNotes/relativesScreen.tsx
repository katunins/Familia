import {View, FlatList} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import SeparatorComponent from "../../components/separator";
import {NavigationScreenProp} from "react-navigation";
import {INoteData, IRelative, IUser} from "../../interfaces/store";
import {actionAddNote} from "../../store/slice/notes.slice";
import {userSelector} from "../../store/selectors";
import {initialNote} from "../../config";
import {getRelativeType} from "../../helpers/utils";
import {INoteImagesProps} from "./imagesScreen";

interface IProps {
    navigation: NavigationScreenProp<{}>
    note: INoteData,
    setNote: (note: INoteData) => void
    relatives: IRelative[],
    imagesProps: INoteImagesProps
}

const RelativesScreen = ({navigation, note, setNote, relatives, imagesProps}: IProps) => {
    const dispatch = useDispatch()
    const user: IUser = useSelector(userSelector)
    const {newImages, setNewImages, deleteImages, setDeleteImages} = imagesProps
    const save = () => {
        dispatch(actionAddNote({
            note: {
                ...note,
                creator: user._id
            },
            callback: () => {
                // @ts-ignore
                navigation.popToTop()
                navigation.navigate('notesListStack', {screen: 'NotesListScreen'})
                setNote(initialNote)
                setNewImages([])
                setDeleteImages([])
            },
            newImages: newImages,
            deleteImages: deleteImages
        }))
    }
    const isChecked = (id: string) => note.relatives.find(item => item === id) ? true : false
    const switchCheck = (id: string) => {
        if (isChecked(id)) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }
    const cancel = () => {
        setNote(initialNote)
        // @ts-ignore
        navigation.popToTop()
    }
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatListWrapper}
                data={relatives}
                renderItem={({item}) =>
                    <RelativeCheckListElementComponent
                        item={item}
                        type={getRelativeType({user, relative: item})}
                        checked={isChecked(item._id)}
                        callBack={() => {
                            switchCheck(item._id)
                        }}
                    />}
                ItemSeparatorComponent={() => <SeparatorComponent/>}
            />
            <View style={globalStyles.marginLine}>
                <ButtonComponent title={'Отменить'} callBack={cancel}/>
                <ButtonComponent title={'Сохранить'} callBack={save} type={'invert'}/>
            </View>
        </View>
    );
};

export default RelativesScreen
