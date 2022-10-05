import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../services/post.service';
import { createSlice } from '@reduxjs/toolkit';
import { setMessage } from './messageSlice';
import { Navigate } from 'react-router-dom';
export const createNewRestaurant = createAsyncThunk('post/create', async (form, thunkAPI) => {
    try {
        const response = await postService.createNewpost(form);
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const updateRestaurant = createAsyncThunk('post/update', async (form, thunkAPI) => {
    try {
        const response = await postService.updatePost(form);
        console.log(response);
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const getAllUserPost = createAsyncThunk('post/getPost', async (userId, thunkAPI) => {
    try {
        const response = await postService.getUserPost(userId);
        return response.posts;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const getAllPost = createAsyncThunk('post/getAllPost', async (userId, thunkAPI) => {
    try {
        const response = await postService.getAllPost();
        console.log(response);
        return response;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const deletePost = createAsyncThunk('post/delete', async (postId, thunkAPI) => {
    try {
        const response = await postService.deletePost(postId);
        console.log(response);
        return response;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

const initialState = { post: [], AllUserPost: [], updatePost: null };
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        removeAll: (state) => {
            state.AllUserPost = [];
        },
        removeAllUserResTaurant: (state) => {
            state.post = [];
        },
        removeUpdatePost: (state) => {
            state.updatePost = null;
            console.log('da remove update');
        },
    },
    extraReducers: {
        [createNewRestaurant.fulfilled]: (state, action) => {
            state.post.push(action.payload);
        },
        [getAllUserPost.fulfilled]: (state, action) => {
            action.payload.map((element) => {
                state.post.push(element);
            });
        },
        [getAllPost.fulfilled]: (state, action) => {
            action.payload.map((element) => {
                state.AllUserPost.push(element);
            });
        },
        [deletePost.fulfilled]: (state, action) => {
            state.AllUserPost = state.AllUserPost.filter((post) => post._id !== action.payload.deleted._id);
            state.post = state.post.filter((post) => post._id !== action.payload.deleted._id);
        },
        [updateRestaurant.fulfilled]: (state, actions) => {
            console.log('payload' + actions.payload);
            state.updatePost = actions.payload;
        },
    },
});
const { reducer, actions } = postSlice;
export const { removeAll, removeAllUserResTaurant, removeUpdatePost } = actions;
export default reducer;
