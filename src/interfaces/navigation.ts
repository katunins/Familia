import {IPost, IPostData, IRelative} from "./store";
import {NewPostsStack} from "../navigation/newPost";

export type RootStackParamList = {
    UserScreen: undefined;
    RelativeListScreen:undefined
    RelativeScreen:undefined
    RelativeFormScreen:{relativeData:IRelative}
    AuthScreen:undefined
    SignUpScreen:undefined
    SignInScreen:undefined
    NewPostsStack:undefined
    NewPostImages:undefined
    NewPostDescription:undefined
    NewPostRelatives: undefined
    PostsListScreen: undefined
    PostEditScreen:{post:IPost}
};
