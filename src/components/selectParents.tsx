import React from "react";
import {FlatList, Pressable, Text, View} from "react-native";
import globalStyles from "../styles/styles";
import styles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {relativesSelector, userSelector} from "../store/selectors";
import {IRelative, IUser} from "../interfaces/store";
import {resetModal, setModal} from "../store/slice/modal.slice";
import FastImage from "react-native-fast-image";
import {uriParse} from "../helpers/utils";

interface IProps {
    value: string
    setValue: (relativeId: string) => void;
    editMode: boolean;
    description: string;
}

const SelectParentsComponent: React.FunctionComponent<IProps> = ({value, setValue, editMode, description}) => {
    const relatives = useSelector(relativesSelector)
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    type IGetRelatives = {
        id: string,
        relatives: IRelative[]
        user: IUser
    }
    const getRelativeName = ({id, relatives, user}: IGetRelatives) => {
        if (user._id === id) return user.name
        return relatives.find(item => item._id === id)?.name || ''
    }
    const closeModal = () => dispatch(resetModal())
    const onPress = () => {
        dispatch(setModal({
            title: 'Выберете родственника',
            component: <RelativesSelectorComponent relatives={relatives} user={user} onPress={(id) => {
                setValue(id)
                closeModal()
            }} clearParents={clearParents}/>,
            buttons: [{title: 'Отменить'}]
        }))
    }

    const clearParents = () => {
        setValue('')
        closeModal()
    }
    type IRelativesSelector = {
        relatives: IRelative[]
        user: IUser
        onPress: (id: string) => void
        clearParents: () => void
    }
    const RelativesSelectorComponent = ({relatives, user, onPress, clearParents}: IRelativesSelector) => {
        return <FlatList data={[...relatives, user]} style={styles.parentSelectorContainer} renderItem={({item}) =>
            <Pressable style={styles.parentSelectorWrapper} onPress={() => onPress(item._id)}>
                {/*@ts-ignore*/}
                <FastImage style={[globalStyles.miniUserPic, styles.parentSelectorImage]}
                           source={uriParse(item.userPic)}/>
                <Text style={styles.parentSelectorText}>{item.name}</Text>
            </Pressable>
        } ListFooterComponent={<Pressable style={styles.parentSelectorWrapper} onPress={clearParents}>
            {/*@ts-ignore*/}
            <FastImage style={[globalStyles.miniUserPic, styles.parentSelectorImage, globalStyles.border]}/>
            <Text style={styles.parentSelectorText}>Без родителя</Text>
        </Pressable>}/>
    }
    if (!editMode) return null
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.editDescription}>{description}</Text>
            <Pressable style={globalStyles.textInput} onPress={onPress}>
                <Text style={styles.parentSelectorText}>{getRelativeName({id: value, relatives, user})}</Text>
            </Pressable>
        </View>
    )
}

export default SelectParentsComponent
