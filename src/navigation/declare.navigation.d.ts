/**
 * GLOBAL NAVIGATION DECLARATION
 */

import {INote, IRelative, IServerRelative} from "../interfaces/store";

export type RootStackParamList = {

    // Stacks
    notesListStack: {screen: 'NotesListScreen'};
    addNoteStack: undefined
    relativeStack: undefined
    personalStack: undefined

    //LoginStack
    AuthScreen: undefined;
    SignUpScreen: undefined;
    SignInScreen: undefined;

    //NotesStack
    NotesListScreen: { noUpdateList?: boolean };
    NoteEditScreen: {note: INote};
    NoteDetailScreen: {note: INote};

    //AddNoteStack
    AddNoteStepOne: undefined;
    AddNoteStepSecond: undefined;

    //UserStack
    UserScreen: undefined

    //TreeScreen
    treeScreen: undefined;

    //RelativeStack
    RelativeListScreen: {noUpdateList?: boolean};
    RelativeDetailScreen: { relativeData: IRelative };
    RelativeFormScreen: { relativeData: IRelative | IServerRelative};
}

export {};
declare global {

    export namespace ReactNavigation {
        export interface RootParamList extends RootStackParamList {
        }
    }
}
