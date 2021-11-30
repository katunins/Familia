import {INote, IRelative, IServerRelative, IUser} from "./store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {NavigatorScreenParams, RouteProp} from "@react-navigation/native";
import {initialRelative} from "../config";
import {ITreeRoot} from "../screens/tree/treeBlock";

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
    TreeScreen: {user : IUser | IRelative}
};

export interface INavigation {
    navigation: NativeStackNavigationProp<RootStackParamList, 'RelativeScreen'>;
    route: RouteProp<RootStackParamList>
}


