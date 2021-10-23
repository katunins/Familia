import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {IPost, IRelative, IUser} from '../interfaces/store';
import DeviceInfo from "react-native-device-info";

const UsersCollection: FirebaseFirestoreTypes.CollectionReference<IUser> = firestore().collection('UserCollection')
const RelativeCollection: FirebaseFirestoreTypes.CollectionReference<IRelative> = firestore().collection('RelativeCollection');
const PostsCollection: FirebaseFirestoreTypes.CollectionReference<IPost> = firestore().collection('PostsCollection');
/**
 * Получаем пользователя из firebase
 * после запроса проверяем - один ли объект
 * также добавляем id документа firestore в объект
 * @param uid - уникальный id из авторизации
 */

const getUserByUID = async (uid: string) => {
    const result: IUser[] = [];
    try {
        const querySnapshot = await UsersCollection.where('uid', '==', uid).get();
        querySnapshot.forEach(el => {
            result.push({...el.data(), id: el.id});
        });
        return result.length === 1 ? result[0] : false;
    } catch (err) {
        console.log('error', err);
        return false;
    }
};


/**
 * фиксирует в файрбейзе у пользователя данныe устройства
 * @param type true - регистрирует / false - удаляет регистрацию
 */
const setAuthDevice = async (type: boolean, user: IUser) => {
    try {
        const actualUser = await FirebaseServices.getUserByUID(user.uid);
        if (actualUser && actualUser.authDevice.id !== user.authDevice.id) return
        await FirebaseServices.updateUser({
            ...user,
            authDevice:
                {id: type ? DeviceInfo.getUniqueId() : '', lastRequest: firestore.FieldValue.serverTimestamp()}
        })

    } catch (e) {
        console.log(e)
    }
}

/**
 * Обновим пользователя
 * @param user - объект данных пользователя
 */
const updateUser = async (user: IUser) => {
    try {
        await UsersCollection.doc(user.id).update(user);
        return true;
    } catch (e) {
        console.log('error', e);
        return false;
    }
};

/**
 * Обновим родственника
 * @param user - объект данных родственника
 */
const updateRelative = async (user: IRelative) => {
    try {
        await RelativeCollection.doc(user.id).update(user);
        return true;
    } catch (e) {
        console.log('error', e);
        return false;
    }
};

/**
 * Удалим родственника
 */
const deleteRelative = async (id: string) => {
    try {
        return await RelativeCollection.doc(id).delete();
    } catch (e) {
        console.log(e);
    }
};

/**
 * Получим данные родственников
 * @param relativeArr - массив ID
 */
const getRelatives = async (relativeArr: string[]) => {
    try {
        const result: IRelative[] = [];
        for (const key in relativeArr) {
            const id = relativeArr[key];
            const res = await RelativeCollection.doc(id).get() as FirebaseFirestoreTypes.QueryDocumentSnapshot<IRelative>;
            // if (res.exists) result.push({...res.data(), id: id});
            if (res.exists) result.push(res.data());
        }
        return result;
    } catch (err) {
        console.log('error', err);
        return false;
    }
};

interface IPutImage {
    pathToFile: string;
    remoteFolder: string;
}

/**
 * Сохраняет изображение
 * @param pathToFile
 * @param remoteFolder
 */
const putImage = async ({pathToFile, remoteFolder}: IPutImage) => {
    const fileName = pathToFile.split('/').pop()
    try {
        const result = await storage().ref(`${remoteFolder}/${fileName}`).putFile(pathToFile)
        return result;
    } catch (error) {
        console.log('error', error);
        return false;
    }
};

const deleteImage = async (uri:string) => {
    try {
        await storage().ref(uri).delete()
        return true;
    } catch (error) {
        console.log('error', error);
        return false;
    }
};

/**
 * Добавление родственника
 * @param relative
 */
const newRelative = async (relative: IRelative) => {
    try {
        const result = await RelativeCollection.add(relative);
        return result;
    } catch (error) {
        console.log('error', error);
        return false;
    }
};

/**
 * Добавление пользователя
 * @param userData
 */
const newUser = async (userData: IUser) => {
    try {
        const result = await UsersCollection.add(userData);
        return result;
    } catch (error) {
        console.log('error', error);
        return false;
    }
};

/**
 * Добавление поста
 * @param post
 */
const addPost = async (post: IPost) => {
    try {
        const result = await PostsCollection.add(post);
        return result;
    } catch (error) {
        console.log('error', error);
        return false;
    }
}
/**
 * Обновление поста
 * @param post
 */
const updatePost = async (post: IPost) => {
    try {
        await PostsCollection.doc(post.id).update(post);
        return true;
    } catch (e) {
        console.log('error', e);
        return false;
    }
};


/**
 * удаление поста
 * @param id
 */
const deletePost = async (id: string) => {
    try {
        return await PostsCollection.doc(id).delete();
    } catch (e) {
        console.log('error', e);
        return false;
    }
};
/**
 * загрузка постов
 * @param id - создатель
 */
const getPosts = async (id: string) => {
    try {
        const querySnapshot = await PostsCollection.where('creator', '==', id).get() as FirebaseFirestoreTypes.QuerySnapshot<IPost>
        const result: IPost[] = []
        querySnapshot.forEach(item => result.push(item.data()))
        return result;
    } catch (e) {
        console.log('error', e);
        return false;
    }
};

const FirebaseServices = {
    getUserByUID,
    updateUser,
    putImage,
    getRelatives,
    newRelative,
    updateRelative,
    newUser,
    deleteRelative,
    setAuthDevice,
    addPost,
    updatePost,
    getPosts,
    deletePost,
    deleteImage
};
export default FirebaseServices;
