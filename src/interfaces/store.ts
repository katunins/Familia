import {Action} from 'redux';
import {IButtonsProps} from "../components/button";
import React from "react";

export interface IModalData {
    title?: string;
    bodyText?: string;
    component?: React.ReactElement
    buttons?: IButtonsProps[];
}

export interface IModal {
    active: boolean;
    data: IModalData;
}

// export interface IRelativeTypes {
//     type:
//         | 'father'
//         | 'mother'
//         | 'brother'
//         | 'sister'
//         | 'grandmother'
//         | 'grandfather'
//         | 'godmother'
//         | 'godfather'
//         | 'other';
// }

export interface IGeneralUser extends IParents {
    userPic: string;
    name: string;
    birthday: string;
    about: string;
}

export interface IServerId {
    _id: string
}

export interface IParents {
    parents: {
        mother: string
        father: string
    }
}

export type ITreeRelative = IUser | IRelative

export interface IServerUser extends IGeneralUser {
    email: string;
}

export interface IUser extends IServerUser, IServerId {
}

export interface IServerRelative extends IGeneralUser {
    access: {
        creatorId: string;
        shareId: string[];
    };
}

export interface IRelative extends IServerRelative, IServerId {
}

export interface INoteData {
    images: string[],
    title: string,
    description: string,
    relatives: string[],
    date: string
}

export interface IServerTimeStamps {
    createdAt?: string
    updatedAt?: string
}

export interface IServerNote extends INoteData {
    creator: string
}

export interface INote extends IServerNote, IServerId, IServerTimeStamps {
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
        rootUserId: string
    };
}

export default IStore;
