import React from "react";
import {Pressable, TextInput} from "react-native";
import DeleteIcon from "../ui/svg/deleteIcon";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

interface IProps {
    searchText:string
    setSearchText:(searchText:string)=>void
}

const SearchLineComponent: React.FunctionComponent<IProps> = ({searchText, setSearchText}) => {
    const erase = () => {
        setSearchText('')
    }
    return (
        <Pressable onPress={erase} style={[styles.searchLineContainer]}>
            <TextInput
                style={styles.searchLine}
                onChangeText={setSearchText}
                value={searchText}
                placeholder={'Поиск ...'}
                placeholderTextColor={EStyleSheet.value('$colorDarkGrey')}
            />
            {searchText !== '' && <DeleteIcon/>}
        </Pressable>
    )
}

export default SearchLineComponent
