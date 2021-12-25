import React from "react";
import {FlatList, Text, View} from "react-native";
import styles from "../screens/notes/styles";
import RelativeCheckListElementComponent from "./relativeCheckListElement";
import {isRelativeChecked} from "../helpers/utils";
import {INote, IRelative, IRelativeAndType, IServerNote, IUser} from "../interfaces/store";
import globalStyles from "../styles/styles";

interface IProps {
    note: INote | IServerNote,
    setNote: (note: INote | IServerNote) => void
    relativesWithTypes: IRelativeAndType[]
    ListHeaderComponent?: React.ReactElement
    ListFooterComponent?: React.ReactElement
}

const NoteEditRelativesComponent: React.FunctionComponent<IProps> = (
    {
        note,
        setNote,
        relativesWithTypes,
        ListHeaderComponent = <Text
            style={styles.centerTitleText}>'Отметьте
            родственников'</Text>,
        ListFooterComponent,
    }) => {

    const switchCheck = (id: string) => {
        if (isRelativeChecked({id, relatives: note.relatives})) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }

    return (
        <FlatList
            style={[styles.flatListWrapper, globalStyles.paddingWrapper]}
            data={relativesWithTypes}
            renderItem={({item}) =>
                <RelativeCheckListElementComponent
                    item={item}
                    checked={isRelativeChecked({id: item._id, relatives: note.relatives})}
                    callBack={() => {
                        switchCheck(item._id)
                    }}
                    type={item.type}
                />}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            ItemSeparatorComponent={() => <View style={globalStyles.marginBottom}/>}
        />
    )
}

export default NoteEditRelativesComponent
