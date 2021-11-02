import {INote, IRelative} from "./store";

export type RootStackParamList = {
    UserScreen: undefined;
    RelativeListScreen:undefined
    RelativeScreen:undefined
    RelativeFormScreen:{relativeData:IRelative}
    AuthScreen:undefined
    SignUpScreen:undefined
    SignInScreen:undefined
    NewNotesStack:undefined
    NewNoteImages:undefined
    NewNoteDescription:undefined
    NewNoteRelatives: undefined
    NotesListScreen: undefined
    NoteEditScreen:{note:INote}
};
