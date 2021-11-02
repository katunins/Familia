import {Action} from 'redux';
import {IButtonsProps} from "../components/button";

export interface IModalData {
    title?: string;
    bodyText: string;
    buttons: IButtonsProps[];
}

export interface IModal {
    active: boolean;
    data: IModalData;
}

export interface IRelativeTypes {
    type:
        | 'father'
        | 'mother'
        | 'brother'
        | 'sister'
        | 'grandmother'
        | 'grandfather'
        | 'godmother'
        | 'godfather'
        | 'other';
}

export interface IRelativeIndex extends IRelativeTypes {
    id: string;
}

export interface IGeneralUser {
    userPic: string;
    name: string;
    birthday: string;
    about: string;
}

interface IServerId {
    _id: string
}

export interface IServerUser extends IGeneralUser {
    relatives: IRelativeIndex[];
    email: string;
}

export interface IUser extends IServerUser, IServerId {
}

export interface IServerRelative extends IGeneralUser {
    access: {
        creatorId: string;
        shareId: string[];
    };
    type?: IRelativeTypes
}

export interface IRelative extends IServerRelative, IServerId {
}

export interface INoteData {
    images: string[],
    title: string,
    description: string,
    relatives: string[],

}

export interface IServerNote extends INoteData {
    creator: string
}

export interface INote extends IServerNote, IServerId {
}

interface IStore extends Action {
    data: {
        modal: IModal;
        user: IUser;
        notes: INote[]
        loader: boolean;
        relatives: IRelative[];
        relativeForm: IRelative | {}
        token: string
    };
}

export interface IImagePicker {
    filename: string
    height: number
    mime: string
    path: string
    size: number
    sourceURL: string
    width: number
}

export default IStore;

export interface IImageUri {
    uri: string,
    local?: boolean
}
