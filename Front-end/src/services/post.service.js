import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:5000/post/';
const createNewpost = async (form) => {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(API_URL + 'create', form, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response;
        });
};

const updatePost = async (form) => {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(API_URL + 'update', form, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response;
        });
};

const getUserPost = async (userId) => {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(API_URL + 'getAll', {
            params: {
                userId: userId,
            },
            headers: {
                Authorization: 'Bearer ' + user.accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
};

const getAllPost = async () => {
    return axios
        .get(API_URL + 'getAllPost', {
            headers: authHeader(),
        })
        .then((response) => {
            return response.data;
        });
};
const deletePost = async (postId) => {
    const header = await authHeader();
    return axios
        .delete(
            API_URL + `delete/?ids=${postId}`,
            {
                headers: header,
            },
            // {
            //     url: API_URL + `delete/?ids=${postId}`,
            //     method: 'delete',
            //     data: { postId },
            //     headers: header,
            // },
        )
        .then((response) => {
            return response.data;
        });
};

const postService = {
    createNewpost,
    getUserPost,
    getAllPost,
    deletePost,
    updatePost,
};

export default postService;
