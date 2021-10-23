import {createAction} from '@reduxjs/toolkit';
import {IUserAuthData} from '../../interfaces';
import {Dispatch} from 'react';
import {Action} from 'redux';

export interface IActionLogOut {
  type: string;
  payload: {};
}

export interface IActionSign extends IActionLogOut {
  type: string;
  payload: {
    data: IUserAuthData;
  };
}

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
  function prepare(payload: {data: IUserAuthData}) {
    return {
      payload,
    };
  },
);

export const actionSignUp = createAction(
  'firebase/actionSignUp',
    function prepare(payload: {data: IUserAuthData}) {
        return {
            payload,
        };
    },
);

export const actionLogOut = createAction(
  'firebase/actionLogOut'
);
