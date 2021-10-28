import {rem} from '../styles/remStyles';
import {
    IRelative,
    IRelativeIndex, IUser,
} from '../interfaces/store';
import FirebaseServices from '../api/firebase';
import storage from '@react-native-firebase/storage';
import {Dimensions} from "react-native";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {relativeTypes} from "../config";

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

export const getRelativeType =
    ({
         userRelatives,
         id,
     }: IGetRelativeTypeName) => {
        const result = userRelatives.filter(el => el.id === id)
        if (result.length === 0) return 'other'
        return userRelatives.filter(el => el.id === id)[0].type;
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
    return selectRelatives.find(item => item._id === id)?.userPic
}

export const splitUserId = (user: IUser | IRelative) => {
    const userData = JSON.parse(JSON.stringify(user));
    const id = userData._id
    delete userData._id
    return {id, userData}
}

export const marginHorizontal = 12
export const containerWidth = Dimensions.get('window').width - marginHorizontal * 2
export const squareAvatarSize = (Dimensions.get('window').width - marginHorizontal * 2) / 2 - 8
