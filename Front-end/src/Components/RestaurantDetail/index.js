import React, { useState, useEffect, Fragment, useLayoutEffect, useRef } from 'react';
import UserService from '../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.scss';
import clsx from 'clsx';
import './themify-icons.css';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { deletePost, getAllUserPost } from '../../features/folder/postSlice';
import { Buffer } from 'buffer';
import { updateRestaurant, removeUpdatePost } from '../../features/folder/postSlice';
const RestaurantDetail = (props) => {
    const [UpdatePost, setUpdatePost] = useState(null);
    const dispatch = useDispatch();
    let { state } = useLocation();
    console.log(state);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { updatePost: updatePost } = useSelector((state) => state.post);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [addDisplayClass, setAddDisplayClass] = useState(false);
    const [postDeleteYet, setpostDeleteYet] = useState(false);
    let navigate = useNavigate();
    console.log(updatePost);
    if (postDeleteYet) {
        // dispatch(getAllUserPost())
        navigate('/home', { replace: true });
    }
    const handleClickEvent = () => {
        setAddDisplayClass(true);
    };
    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    const handleChangeFile = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const handleCancelEvent = (e) => {
        e.preventDefault();
        setAddDisplayClass(false);
    };

    const handleCreateSubmitForm = (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append('name', name);
        form.append('address', address);
        form.append('description', description);
        form.append('myImage', selectedImage);
        form.append('userId', currentUser.id);
        form.append('postId', state._id);
        form.append('username', currentUser.username);
        dispatch(updateRestaurant(form));
        setAddDisplayClass(false);
    };

    const handelDeletePost = (post) => {
        if (post.userPostId !== currentUser.id && !currentUser.roles.includes('ROLE_ADMIN')) {
            console.log('u are not allow');
            alert('you are not allowed');
            return;
        } else {
            dispatch(deletePost(post._id));
            setpostDeleteYet(true);
        }
    };
    const handelEditPost = (post) => {
        if (post.userPostId !== currentUser.id) {
            console.log('u are not allow');
            alert('you are not allowed');
            return;
        } else setAddDisplayClass(true);
    };
    useEffect(() => {
        console.log(updatePost);
        if (updatePost) {
            console.log('day la update posts');
            navigate('/resDes', { state: updatePost });
        }
        return () => dispatch(removeUpdatePost());
    }, [updatePost]);

    return (
        <div className={clsx(style.height)}>
            <br></br>
            <br></br>
            <div className={clsx(style.container)}>
                <div className={clsx(style.containerLeftContent)}>
                    <div className={clsx(style.LeftContentImage)}>
                        <img
                            src={`data:${state.picture.contentType};base64, ${Buffer.from(
                                state.picture.data.data,
                            ).toString('base64')}`}
                            alt="Girl in a jacket"
                        />
                    </div>
                    <div className={clsx(style.Buttons)}>
                        <button
                            onClick={() => {
                                handelDeletePost(state);
                            }}
                            className={clsx(style.deleteButton)}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                handelEditPost(state);
                            }}
                            className={clsx(style.editButton)}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className={clsx(style.containerRightContent)}>
                    <h1>{state.restaurantName}</h1>
                    <p>
                        Share by <span className={clsx(style.UserShare)}>{state.userPost}</span>
                    </p>
                    <p>
                        <i className="ti-location-pin"></i>
                        {state.address}
                    </p>
                    <p>{state.description}</p>
                </div>
            </div>
            <form encType="multipart/form-data">
                <div className={clsx({ [style.modal]: true, [style.open]: addDisplayClass })}>
                    <div className={clsx(style.modalContainer)}>
                        <div className={clsx(style.modalCloseIcon)}>
                            <i className="ti-close"></i>
                        </div>
                        <header className={clsx(style.modalHeader)}>Update the restaurant!</header>
                        <div className={clsx(style.modalBody)}>
                            <div className={clsx(style.modalContent)}>
                                <label htmlFor="name" className={clsx(style.modalLabel)}>
                                    Name
                                </label>
                                <input
                                    value={name}
                                    id="name"
                                    type="text"
                                    className={clsx(style.modalInput)}
                                    placeholder="Give me a name"
                                    onChange={handleChangeName}
                                    name="name"
                                />
                            </div>

                            <div className={clsx(style.modalContent)}>
                                <label htmlFor="address" className={clsx(style.modalLabel)}>
                                    Address
                                </label>
                                <input
                                    value={address}
                                    id="address"
                                    type="text"
                                    className={clsx(style.modalInput)}
                                    placeholder="Exact location?"
                                    onChange={handleChangeAddress}
                                    name="address"
                                />
                            </div>
                            <div className={clsx(style.modalContent)}>
                                <label htmlFor="description" className={clsx(style.modalLabel)}>
                                    Description
                                </label>
                                <input
                                    value={description}
                                    id="description"
                                    type="text"
                                    className={clsx(style.modalInput)}
                                    placeholder="Short introduction?"
                                    onChange={handleChangeDescription}
                                    name="description"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="file">Upload File:</label>
                                <input
                                    className="form-control-file mb-3"
                                    type="file"
                                    name="myImage"
                                    id="file"
                                    accept=".jpg"
                                    onChange={handleChangeFile}
                                />
                            </div>

                            {/*   end of the form for create restaurant *
                             *
                             *
                             *
                             */}

                            <div>
                                <button onClick={handleCancelEvent} className={clsx(style.payButton)}>
                                    Cancel
                                </button>

                                <button onClick={handleCreateSubmitForm} className={clsx(style.payButton)}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default RestaurantDetail;
