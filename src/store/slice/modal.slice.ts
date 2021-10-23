import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IModal, IModalData} from '../../interfaces/store';

const initialState: IModal = {
  active: false,
  data: {
    bodyText: '',
    buttons: [],
  },
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IModalData>) => {
      return {
        active: true,
        data: action.payload,
      };
    },
    resetModal: () => {
      return initialState;
    },
  },
});

export const {setModal, resetModal} = modalSlice.actions;
export default modalSlice.reducer;
