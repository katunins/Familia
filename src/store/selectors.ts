import IStore from "../interfaces/store";

const userSelector = (state: IStore) => state.data.user

export const relativesSelector = (state: IStore) => state.data.relatives
export const modalSelector = (state: IStore) => state.data.modal
export const loaderSelector = (state: IStore) => state.data.loader
export const postsSelector = (state: IStore) => state.data.posts

export default userSelector
