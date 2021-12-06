import {INote, IRelative} from "./store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import { RouteProp} from "@react-navigation/native";
import {ITreeItem} from "../screens/tree/item";

export type RootStackParamList = {
    UserScreen: undefined;
    RelativeListScreen: undefined
    RelativeScreen: {relative: IRelative}
    RelativeDetailScreen: {relativeData: IRelative}
    RelativeFormScreen: { relativeData: IRelative }
    AuthScreen: undefined
    SignUpScreen: undefined
    SignInScreen: undefined
    NotesListScreen: undefined
    NoteEditScreen: { note: INote }
    NoteDetailScreen: { note: INote }
    AddNoteStepOne: undefined
    AddNoteStepSecond: undefined
    TreeScreen: {rootUser : ITreeItem}
};

export interface INavigation {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RelativeScreen'>;
    route: RouteProp<RootStackParamList>
}


