import React from "react";
import {FlatList, View} from "react-native";
import RelativeBigComponent from "../../components/relativeBigComponent";
import globalStyles from "../../styles/styles";
import NoteComponent from "../../components/note";
import {useSelector} from "react-redux";
import {notesSelector, relativesSelector} from "../../store/selectors";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/declare.navigation";

const RelativeDetailScreen: React.FunctionComponent = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'RelativeDetailScreen'>>()
    const navigation = useNavigation()

    const relative = route.params.relativeData
    const notes = useSelector(notesSelector)
    const relatives = useSelector(relativesSelector)
    const filteredNotes = notes.filter(item => item.relatives.find(el => el === relative._id))

    const editRelative = () => {
        navigation.navigate('RelativeFormScreen', {relativeData: relative})
    }

    return (
        <FlatList
            style={globalStyles.containerColor}
            data={filteredNotes}
            ListHeaderComponent={() =>
                <RelativeBigComponent item={relative} editButton={editRelative} type={'ff'}/>}
            renderItem={({item}) =>
                <NoteComponent
                    item={item} mini={true}
                    selectRelatives={relatives}
                />
            }
            ItemSeparatorComponent={() => <View style={globalStyles.marginLine}/>}
        />)
}

export default RelativeDetailScreen
