import {all} from 'redux-saga/effects';
import {watchAuth, watchForFirebaseAuth} from './auth.saga';
import {watchUser} from './user.saga';
import {watchRelative} from './relative.saga';
import {watchPosts} from "./posts.saga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchUser(),
        watchRelative(),
        watchForFirebaseAuth(),
        watchPosts()
    ]);
}
