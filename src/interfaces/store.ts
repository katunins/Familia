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
    id: string;
    birthday: string;
    relatives: IRelativeIndex[];
    about: string;
}

export interface IUserAuthDevice {
    id: string,
    lastRequest: any
}

export interface IUser extends IGeneralUser {
    uid: string;
    authDevice: IUserAuthDevice
    email: string;
}

export interface IRelative extends IGeneralUser {
    creatorId?: string;
    type?: IRelativeTypes
}

export interface IPostData {
    images: string[],
    title: string,
    description: string,
    relatives: string[],

}

export interface IPost extends IPostData {
    id: string,
    creator: string,
    createdAt: FirebaseFirestoreTypes.FieldValue
    updatedAt: FirebaseFirestoreTypes.FieldValue
}

interface IStore extends Action {
    data: {
        modal: IModal;
        user: IUser;
        posts: IPost[]
        loader: boolean;
        relatives: IRelative[];
        relativeForm: IRelative | {}
    };
}

export default IStore;
