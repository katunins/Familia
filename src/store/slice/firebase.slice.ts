import {createAction} from '@reduxjs/toolkit';
import {ILoginData, ISignUpData} from "../../interfaces";

export const actionDeleteImages = createAction(
    'firebase/deleteImages',
    function prepare(payload: string[]) {
        return {
            payload,
        };
    },
);

export const actionSignIn = createAction(
  'firebase/actionSignIn',
  function prepare(payload: {data: ILoginData}) {
    return {
      payload,
    };
  },
);

export const actionSignUp = createAction(
  'firebase/actionSignUp',
    function prepare(payload: {data: ISignUpData}) {
        return {
            payload,
        };
    },
);

export const actionLogOut = createAction(
  'firebase/actionLogOut'
);
