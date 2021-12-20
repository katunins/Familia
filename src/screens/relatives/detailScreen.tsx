import React, {useEffect} from "react";
import {FlatList, View} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../interfaces/navigation";
import RelativeBigComponent from "../../components/relativeBigComponent";
import {IRelative} from "../../interfaces/store";
import globalStyles from "../../styles/styles";
import NoteComponent from "../../components/note";
import {useSelector} from "react-redux";
import {notesSelector, relativesSelector} from "../../store/selectors";

type IProps = NativeStackScreenProps<RootStackParamList, 'RelativeDetailScreen'>;
const RelativeDetailScreen:React.FunctionComponent<IProps> = ({route, navigation}) => {

    const relative = route.params.relativeData
    useEffect(()=>navigation.setOptions({headerTitle: relative.name}), [])

    const notes = useSelector(notesSelector)
    const relatives = useSelector(relativesSelector)
    const filteredNotes = notes.filter(item => item.relatives.find(el => el === relative._id))

    const editRelative = () => {
        navigation.navigate({name: 'RelativeFormScreen', params: {relativeData: relative}});
    }

    return (
        <FlatList
            style={globalStyles.containerColor}
            data={filteredNotes}
            ListHeaderComponent={() =>
                <RelativeBigComponent item={relative} editButton={()=>editRelative()} type={'ff'}/>}
            renderItem={({item, index}) =>
                <NoteComponent
                    item={item} index={index} mini={true}
                    selectRelatives={relatives}
                />
            }
            ItemSeparatorComponent={() => <View style={globalStyles.marginLine}/>}
        />)
}

export default RelativeDetailScreen
