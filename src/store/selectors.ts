import IStore from "../interfaces/store";

export const userSelector = (state: IStore) => state.data.user
export const relativesSelector = (state: IStore) => state.data.relatives
export const modalSelector = (state: IStore) => state.data.modal
export const loaderSelector = (state: IStore) => state.data.loader
export const notesSelector = (state: IStore) => state.data.notes
export const tokenSelector = (state: IStore) => state.data.token
export const rootUserIdSelector = (state:IStore)=>state.data.rootUserId
