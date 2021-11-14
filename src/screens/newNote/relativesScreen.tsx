import {View, FlatList} from "react-native";
import React from "react";
import ButtonComponent from "../../components/button";
import styles from "./styles";
import globalStyles from "../../styles/styles";
import {useDispatch, useSelector} from "react-redux";
import RelativeCheckListElementComponent from "../../components/relativeCheckListElement";
import SeparatorComponent from "../../components/separator";
import {INoteData, IRelative, IUser} from "../../interfaces/store";
import {actionAddNote} from "../../store/slice/notes.slice";
import {userSelector} from "../../store/selectors";
import {initialNote} from "../../config";
import {containerWidth, getRelativeType, isRelativeChecked} from "../../helpers/utils";
import {INoteImagesProps} from "./imagesScreen";
import ImageAndCountComponent from "../../components/imageAndCount";
import {INavigation} from "../../interfaces/navigation";

interface IProps extends INavigation {
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
        // @ts-ignore
        navigation.navigate('notesListStack', {screen: 'NotesListScreen'})
        dispatch(actionAddNote({
            note: {
                ...note,
                creator: user._id
            },
            newImages: newImages,
            deleteImages: deleteImages,
            callback: reset,
        }))

    }
    const switchCheck = (id: string) => {
        if (isRelativeChecked({id, relatives: note.relatives})) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }
    const reset = () => {
        setNote(initialNote)
        setNewImages([])
        setDeleteImages([])
        navigation.popToTop()
    }
    return (
        <View style={styles.container}>
            <ImageAndCountComponent
                uriArr={[...newImages.map(item => item.path), ...note.images]}
                width={containerWidth} callBack={() => navigation.goBack()}/>
            <FlatList
                style={styles.flatListWrapper}
                data={relatives}
                renderItem={({item}) =>
                    <RelativeCheckListElementComponent
                        item={item}
                        type={getRelativeType({user, relative: item})}
                        checked={isRelativeChecked({id: item._id, relatives: note.relatives})}
                        callBack={() => {
                            switchCheck(item._id)
                        }}
                    />}
                ItemSeparatorComponent={() => <SeparatorComponent/>}
            />
            <View style={globalStyles.marginLine}>
                <ButtonComponent title={'Сохранить'} callBack={save} type={'invert'}/>
                <ButtonComponent title={'Отменить'} callBack={reset}/>
            </View>
        </View>
    );
};

export default RelativesScreen
