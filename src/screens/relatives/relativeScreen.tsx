import React from "react";
import {RootStackParamList} from "../../interfaces/navigation";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {FlatList, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {notesSelector, relativesSelector} from "../../store/selectors";
import NoteComponent from "../../components/note";
import globalStyles from "../../styles/styles";
import {uriParse} from "../../helpers/utils";;
import FastImage from "react-native-fast-image";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, 'RelativeScreen'>;
const RelativeScreen: React.FunctionComponent<Props> = ({navigation, route}) => {
    const {relative} = route.params
    const notes = useSelector(notesSelector)
    const selectRelatives = useSelector(relativesSelector)
    const filteredNotes = notes.filter(item => item.relatives.find(el => el === relative._id))
    navigation.setOptions({title: relative.name})

    return (
        <FlatList
            style={globalStyles.containerColor}
            data={filteredNotes}
            ListHeaderComponent={() =>
                <View style={[globalStyles.row, globalStyles.marginLine,globalStyles.paddingWrapper]}>
                    {/*@ts-ignore*/}
                    <FastImage style={styles.userPicWrapper}
                               source={uriParse(relative.userPic)} resizeMode={'cover'}/>
                    <View style={globalStyles.marginLine}>
                        <Text style={[globalStyles.title, styles.relativeName]}>{relative.name}</Text>
                        {filteredNotes.length > 0 && <Text>Отмечена
                            в {filteredNotes.length} публикац{filteredNotes.length === 1 ? 'ии' : 'иях'}</Text>}
                    </View>
                </View>}
            renderItem={({item, index}) =>
                <NoteComponent
                    item={item} index={index} mini={true}
                    selectRelatives={selectRelatives} navigation={navigation}

                />
            }
            ItemSeparatorComponent={() => <View style={globalStyles.marginLine}/>}
        />
    )
}
export default RelativeScreen
