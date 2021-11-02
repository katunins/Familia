import {INoteData, IServerNote, IServerRelative, IServerUser} from "./interfaces/store";

const env = {
    // endPointUrl: 'http://localhost:3000'
    endPointUrl: 'http://nestjs.ikatunin.ru:8080'
}

const initialGeneralUser = {
    name: '',
    userPic: '',
    birthday: '',
    relatives: [],
    about: '',
};

export const initialUser: IServerUser = {
    name: '',
    userPic: '',
    birthday: '',
    relatives: [],
    about: '',
    email: '',
};
export const initialRelative: IServerRelative = {
    name: '',
    userPic: '',
    birthday: '',
    about: '',
    access: {
        creatorId: '',
        shareId: []
    }
};
export const initialNote: INoteData = {
    images: [],
    title: '',
    description: '',
    relatives: [],
}

export const defaultUserPic = 'https://alpinabook.ru/resize/1100x1600/upload/iblock/6f9/6f9f5be9fb84ad912ca92b5a0839d9ef.jpg'
export const defaultRelativeUserPic = 'https://alpinabook.ru/resize/1100x1600/upload/iblock/6f9/6f9f5be9fb84ad912ca92b5a0839d9ef.jpg'
export const imagePickerDefaultOptions = {
    freeStyleCropEnabled: true,
    forceJpg: true,
    cropping: true,
    width: 2000,
    height: 2000
}
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

export default env