import {rem} from '../styles/remStyles';
import {Dispatch} from 'react';
import {Action} from 'redux';
import {
    IGeneralUser,
    IRelative,
    IRelativeIndex,
    IUser,
} from '../interfaces/store';
import FirebaseServices from '../api/firebase';
import storage from '@react-native-firebase/storage';
import {Dimensions} from "react-native";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

/**
 * Обработка ссылки на загруженную фотографию
 * проверяет и если ссылка локальная, то выгружает на сервер и возвращает ссылку на сервер
 */

interface INeedToUpload {
    userPic: string;
    id: string;
}

export const needToUpload = async ({userPic, id}: INeedToUpload) => {
    try {
        if (userPic.indexOf('http') > -1) return false;
        const res = await FirebaseServices.putImage({
            pathToFile: userPic,
            remoteFolder: `${id}/userPic`,
        }) as FirebaseFirestoreTypes.DocumentData
        const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
        return url;
    } catch (e) {
        console.log(e);
        return false;
    }
};

/**
 * Функция высчитывания динамического размера
 * получает пиксели - возвращает ремы
 * @param number - Размер
 */
export const remCalc: (number: number) => number = (number: number) =>
    (number / 12) * rem;

interface IGetRelativeTypeName {
    userRelatives: IRelativeIndex[];
    id: string;
}

export const getRelativeType = ({
                                    userRelatives,
                                    id,
                                }: IGetRelativeTypeName) => {
    return userRelatives.filter(el => el.id === id)[0].type;
};

export const relativeTypes = {
    daughter: 'Дочь',
    son: 'Сын',
    aunt: 'Тетя',
    father: 'Отец',
    mother: 'Мама',
    brother: 'Брат',
    sister: 'Сестра',
    grandmother: 'Бабушка',
    grandfather: 'Дедушка',
    godmother: 'Крестная',
    godfather: 'Крестный',
    other: 'Дальний',
};

export const GeneralColors = {
    $textColorGlobal: '#333333',
    $colorBrown: '#A45B18',
    $colorLightGrey: '#E5E5E5',
    $colorWhite: '#FFFFFF',
    $colorGrey: '#8B8B8B',
    $colorDarkGrey: '#595959',
    $colorModal: '#00000099',
    $colorBlack: '#000000',
    $colorBlue: '#2B32BA',
};

const InitialGeneralUserObj: IGeneralUser = {
    id: '',
    name: '',
    userPic: '',
    birthday: '',
    relatives: [],
    about: '',
};

export const InitialUserObj: IUser = {
    ...InitialGeneralUserObj,
    email: '',
    uid: '',
    authDevice: {
        id: '',
        lastRequest: ''
    }
};

export interface IGetRelativeUri {
    selectRelatives: IRelative[]
    id: string
}

/**
 * Возвращает сслыку на аватарку родственника по id
 * @param selectRelatives
 * @param id
 */
export const getRelativeUri = ({selectRelatives, id}: IGetRelativeUri) => {
    return selectRelatives.find(item => item.id === id)?.userPic
}

export const initialPostData = {
    images: [],
    title: '',
    description: '',
    relatives: []
}

export const marginHorizontal = 12
export const containerWidth = Dimensions.get('window').width - marginHorizontal * 2
export const squareAvatarSize = (Dimensions.get('window').width - marginHorizontal * 2) / 2 - 8

export const InitialRelativeObj: IRelative = InitialGeneralUserObj;
