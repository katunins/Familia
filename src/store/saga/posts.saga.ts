import * as Eff from 'redux-saga/effects';
import {all, call, put, select} from 'redux-saga/effects';
import FirebaseServices from '../../api/firebase';
import storage from '@react-native-firebase/storage';
import {IPost, IUser} from '../../interfaces/store';
import {NavigationAction, NavigationNavigateAction} from 'react-navigation';
import {actionLoaderOff, actionLoaderOn} from '../slice/loader.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {actionSetUser} from '../slice/user.slice';
import {needToUpload} from '../../helpers/utils';
import userSelector from "../selectors";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {addPost, deletePost, updatePost} from "../slice/posts.slice";

const takeLatest: any = Eff.takeLatest;

function* watchPosts() {
  yield takeLatest('posts/add', sagaAddPost);
  yield takeLatest('posts/update', sagaUpdatePost);
  yield takeLatest('posts/delete', sagaDeletePost);
}

export interface IActionAddPost {
    post: IPost
    callback: () => void
}

function* sagaAddPost(action: PayloadAction<IActionAddPost>) {
  try {
    yield put(actionLoaderOn());
    const user = yield select(userSelector)
    const imageUrlArr:string[] = []
    yield all(action.payload.post.images.map(async item => {
      const res = await FirebaseServices.putImage({pathToFile: item, remoteFolder: `posts/${user.id}`}) as FirebaseFirestoreTypes.DocumentData
      const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
      imageUrlArr.push(url)
    }));
    const post = {...action.payload.post, images:imageUrlArr}
    const postRes = yield FirebaseServices.addPost(post)
    post.id = postRes.id
    yield FirebaseServices.updatePost(post)
    yield put(addPost(post))

    yield put(actionLoaderOff());
    yield call(action.payload.callback)
  } catch (error) {
    console.log('err', error);
    yield put(actionLoaderOff());
    yield call (action.payload.callback)
  }
}

function* sagaUpdatePost(action: PayloadAction<IActionAddPost>) {
  try {
    yield put(actionLoaderOn());
    const user = yield select(userSelector)
    const imageUrlArr:string[] = []
    yield all(action.payload.post.images.map(async item => {
      if (item.indexOf('https://')<0) {
        const res = await FirebaseServices.putImage({
          pathToFile: item,
          remoteFolder: `posts/${user.id}`
        }) as FirebaseFirestoreTypes.DocumentData
        const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
        imageUrlArr.push(url)
      } else {
        imageUrlArr.push(item)
      }
    }));
    const post = {...action.payload.post, images:imageUrlArr}
    yield FirebaseServices.updatePost(post)
    yield put(updatePost(post))

    yield put(actionLoaderOff());
    yield call(action.payload.callback)
  } catch (error) {
    console.log('err', error);
    yield put(actionLoaderOff());
    yield call (action.payload.callback)
  }
}

function* sagaDeletePost(action: PayloadAction<IActionAddPost>) {
  try {
    yield put(actionLoaderOn());
    yield FirebaseServices.deletePost(action.payload.post.id)
    yield all (action.payload.post.images.map(async item=>{
      await FirebaseServices.deleteImage(item)
    }))
    yield put(deletePost(action.payload.post.id))

    yield put(actionLoaderOff());
    yield call(action.payload.callback)
  } catch (error) {
    console.log('err', error);
    yield put(actionLoaderOff());
    yield call (action.payload.callback)
  }
}
export {watchPosts};
