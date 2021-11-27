import {IServerNote, IServerRelative, IServerUser} from "./interfaces/store";

const env = {
    endPointUrl: 'https://nestjs.ikatunin.ru'
}

export const initialUser: IServerUser = {
    name: '',
    userPic: '',
    birthday: '',
    parents: {
        mother: '',
        father: ''
    },
    relatives: [],
    about: '',
    email: '',
};
export const initialRelative: IServerRelative = {
    name: '',
    userPic: '',
    birthday: '',
    about: '',
    parents: {
        mother: '',
        father: ''
    },
    access: {
        creatorId: '',
        shareId: []
    }
};
export const initialNote: IServerNote = {
    images: [],
    title: '',
    description: '',
    date: '',
    relatives: [],
    creator: '',
}
export const emptyImage = require('../src/ui/images/fastimage_loader.jpg')
export const defaultUserPic = 'https://alpinabook.ru/resize/1100x1600/upload/iblock/6f9/6f9f5be9fb84ad912ca92b5a0839d9ef.jpg'
export const defaultRelativeUserPic = 'https://alpinabook.ru/resize/1100x1600/upload/iblock/6f9/6f9f5be9fb84ad912ca92b5a0839d9ef.jpg'

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
    wife: "Супруга",
    husband: "Муж",
    other: 'Дальний',
};

export const GeneralColors = {
    $textColorGlobal: '#333333',
    $colorBrown: '#A45B18',
    $colorLightGrey: '#E5E5E5',
    $colorSuperLightGrey: '#F3F3F3',
    $colorWhite: '#FFFFFF',
    $colorGrey: '#8B8B8B',
    $colorDarkGrey: '#595959',
    $colorModal: '#00000099',
    $colorBlack: '#000000',
    $colorBlue: '#2B32BA',
};

export const treeItemSize = {
    width: 76,
    height: 80,
    containerWidth: 100,
    marginHorizontal: 0,
    marginVertical: 5,
    LRShift: 20,
    borderRadius: 5
}

export default env
