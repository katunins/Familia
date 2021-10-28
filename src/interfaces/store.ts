import {Action} from 'redux';
import {StyleProp, ViewStyle} from 'react-native';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
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

export interface IPostData {
    images: string[],
    title: string,
    description: string,
    relatives: string[],

}

export interface IPost extends IPostData {
    _id: string,
    creator: string,
    createdAt: string
    updatedAt: string
}

interface IStore extends Action {
    data: {
        modal: IModal;
        user: IUser;
        posts: IPost[]
        loader: boolean;
        relatives: IRelative[];
        relativeForm: IRelative | {}
        token: string
    };
}

export default IStore;
