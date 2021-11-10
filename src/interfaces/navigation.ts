import {INote, IRelative, IServerRelative} from "./store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RouteProp} from "@react-navigation/native";
import {initialRelative} from "../config";

export type RootStackParamList = {
    UserScreen: undefined;
    RelativeListScreen: undefined
    RelativeScreen: undefined
    RelativeFormScreen: { relativeData: IRelative }
    AuthScreen: undefined
    SignUpScreen: undefined
    SignInScreen: undefined
    NewNotesStack: undefined
    NewNoteImages: undefined
    NewNoteDescription: undefined
    NewNoteRelatives: undefined
    NotesListScreen: undefined
    NoteEditScreen: { note: INote }
};

export interface INavigation {
    navigation: NativeStackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList>
}


