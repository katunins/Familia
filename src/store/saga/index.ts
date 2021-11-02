import {all} from 'redux-saga/effects';
import {watchAuth} from './auth.saga';
import {watchUser} from './user.saga';
import {watchRelative} from './relative.saga';
import {watchNetwork} from "./network.saga";
import {watchNotes} from "./notes.saga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchUser(),
        watchRelative(),
        watchNotes(),
        watchNetwork()
    ]);
}
