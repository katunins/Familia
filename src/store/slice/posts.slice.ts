import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from "../../interfaces/store";
import {IActionAddPost} from "../saga/posts.saga";

export const actionAddPost = createAction(
    'posts/add',
    function prepare(payload: IActionAddPost) {
        return {
            payload,
        };
    },
);
export const actionUpdatePost = createAction(
    'posts/update',
    function prepare(payload: IActionAddPost) {
        return {
            payload,
        };
    },
);
export const actionDeletePost = createAction(
    'posts/delete',
    function prepare(payload: IActionAddPost) {
        return {
            payload,
        };
    },
);

const initialState: IPost[] = [];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            return action.payload
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            return [...state, action.payload]
        },
        updatePost:(state, action: PayloadAction<IPost>) => {
            return state.map(item=>item.id === action.payload.id ? action.payload : item)
        },
        deletePost:(state, action: PayloadAction<string>) => {
            return state.filter(item=>item.id !== action.payload)
        },
        resetPosts: () => {
            return initialState;
        },
    },
});

export const {addPost, resetPosts, setPosts, updatePost, deletePost} = postsSlice.actions;
export default postsSlice.reducer;
