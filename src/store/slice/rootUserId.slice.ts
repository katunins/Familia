import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: string = '';

const rootUserIdSlice = createSlice({
    name: 'rootUserId',
    initialState,
    reducers: {
        setRootUserId: (state, action: PayloadAction<string>) => action.payload
    },
});

export const {setRootUserId} = rootUserIdSlice.actions;
export default rootUserIdSlice.reducer;
