import React from "react";
import {FlatList, Text, View} from "react-native";
import styles from "../screens/notes/styles";
import RelativeCheckListElementComponent from "./relativeCheckListElement";
import {getRelativeType, isRelativeChecked} from "../helpers/utils";
import {INote, IRelative, IServerNote, IUser} from "../interfaces/store";
import globalStyles from "../styles/styles";

interface IProps {
    note: INote | IServerNote,
    setNote: (note: INote | IServerNote) => void
    relatives: IRelative[]
    user: IUser
}

const NoteEditRelativesComponent: React.FunctionComponent<IProps> = ({note, setNote, relatives, user}) => {

    const switchCheck = (id: string) => {
        if (isRelativeChecked({id, relatives: note.relatives})) {
            setNote({...note, relatives: note.relatives.filter(item => item !== id)})
        } else {
            setNote({...note, relatives: [...note.relatives, id]})
        }
    }

    return (
        <>
            <Text style={styles.centerTitleText}>Отметьте родственников</Text>
            <FlatList
                style={styles.flatListWrapper}
                data={relatives}
                renderItem={({item}) =>
                    <RelativeCheckListElementComponent
                        item={item}
                        checked={isRelativeChecked({id: item._id, relatives: note.relatives})}
                        callBack={() => {
                            switchCheck(item._id)
                        }}
                        type={getRelativeType({user, relative: item})}
                    />}
                ItemSeparatorComponent={() => <View style={globalStyles.marginBottom}/>}
            />
        </>
    )
}

export default NoteEditRelativesComponent
