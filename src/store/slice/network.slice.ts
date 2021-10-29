import {createAction} from '@reduxjs/toolkit';
import {IUploadSaga} from "../saga/network.saga";

export const actionImageUpload = createAction(
    'network/upload',
    function prepare(payload: IUploadSaga) {
        return {
            payload,
        };
    },
);

// export const actionLogOut = createAction(
//   'firebase/actionLogOut'
// );
