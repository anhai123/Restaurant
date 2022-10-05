import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userName: '',
    password: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice.reducer;
