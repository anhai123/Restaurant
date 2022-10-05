import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../features/folder/messageSlice';
import authReducer from '../features/folder/authSlice';
import postReducer from '../features/folder/postSlice';

const reducer = {
    auth: authReducer,
    message: messageReducer,
    post: postReducer,
};
const store = configureStore({
    reducer: reducer,
    devTools: true,
});
export default store;
