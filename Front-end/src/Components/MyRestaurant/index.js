import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.scss';
import clsx from 'clsx';
import './themify-icons.css';
import { createNewRestaurant, getAllUserPost, removeAllUserResTaurant } from '../../features/folder/postSlice';
import { Buffer } from 'buffer';
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
function Items({ currentItems }) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { updatePost: updatePost } = useSelector((state) => state.post);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [addDisplayClass, setAddDisplayClass] = useState(false);
    const [singlePost, setSinglePost] = useState();
    const dispatch = useDispatch();
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

    const handleClickImageEvent = (e) => {
        if (updatePost) {
            console.log(updatePost);
            setSinglePost(updatePost);
        } else {
            setSinglePost(e);
        }
    };
    const handleCreateRestaurant = (e) => {
        setAddDisplayClass(true);
    };
    const handleCreateSubmitForm = (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append('name', name);
        form.append('address', address);
        form.append('description', description);
        form.append('myImage', selectedImage);
        form.append('userId', currentUser.id);
        dispatch(createNewRestaurant(form));
        setAddDisplayClass(false);
    };

    return (
        <Fragment>
            {singlePost ? (
                <Navigate to="/resDes" state={singlePost} replace={true} />
            ) : !currentItems ? (
                <Fragment>
                    <div className={clsx(style.welcome)}>
                        <h1> Hi {currentUser.email}</h1>
                        <h3>Welcome to FindRest</h3>
                        <div>Click the button below to post a new restaurant</div>
                        <button onClick={handleClickEvent}>Let's start</button>
                    </div>
                    <form encType="multipart/form-data">
                        <div className={clsx({ [style.modal]: true, [style.open]: addDisplayClass })}>
                            <div className={clsx(style.modalContainer)}>
                                <div className={clsx(style.modalCloseIcon)}>
                                    <i className="ti-close"></i>
                                </div>
                                <header className={clsx(style.modalHeader)}>
                                    {/* <i className={clsx(style.)}"ti-bag" style="margin-right: 15px;"></i> */}
                                    Create the restaurant you want!
                                </header>
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            Create
                                        </button>
                                    </div>
                                </div>
                                <div className={clsx(style.modalFooter)}>
                                    <p className={clsx(style.modalHelp)}>
                                        Need <a href="#">help?</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </Fragment>
            ) : (
                <div className={clsx(style.allPostContainer)}>
                    {currentItems.map((element) => {
                        return (
                            <div className={clsx(style.postContainer)}>
                                <img
                                    alt="not fount"
                                    className={clsx(style.postImage)}
                                    src={`data:${element.picture.contentType};base64, ${Buffer.from(
                                        element.picture.data.data,
                                    ).toString('base64')}`}
                                    onClick={() => handleClickImageEvent(element)}
                                />
                                <div className={clsx(style.postContainerContent)}>
                                    <div className={clsx(style.postContainerContentLeft)}>
                                        <h2>{element.restaurantName}</h2>
                                        <p>
                                            <i className="ti-location-pin"></i>
                                            {element.address}
                                        </p>
                                    </div>
                                    <div className={clsx(style.postContainerContentRight)}>
                                        <p>{element.userPost}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <button className={clsx(style.CreateRestaurantIcon)} onClick={() => handleClickEvent()}>
                        <i className="ti-plus"></i>
                    </button>
                    <form encType="multipart/form-data">
                        <div className={clsx({ [style.modal]: true, [style.open]: addDisplayClass })}>
                            <div className={clsx(style.modalContainer)}>
                                <div className={clsx(style.modalCloseIcon)}>
                                    <i className="ti-close"></i>
                                </div>
                                <header className={clsx(style.modalHeader)}>
                                    {/* <i className={clsx(style.)}"ti-bag" style="margin-right: 15px;"></i> */}
                                    Create the restaurant you want!
                                </header>
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            Create
                                        </button>
                                    </div>
                                </div>
                                <div className={clsx(style.modalFooter)}>
                                    <p className={clsx(style.modalHelp)}>
                                        Need <a href="#">help?</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Fragment>
    );
}

function PaginatedItems({ itemsPerPage }) {
    const { post } = useSelector((state) => state.post);
    let AllPost = useMemo(() => {
        return post;
    }, [post]);
    console.log('render pagginatedItems');
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        if (AllPost.length > 0) {
            console.log('chay effect o trong renderpaginate');
            setCurrentItems(AllPost.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(AllPost.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, AllPost]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % AllPost.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <div className={clsx(style.height)}>
            <Items currentItems={currentItems} />
            <ReactPaginate
                // breakLabel="..."
                // nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                containerClassName={'pagination pagination1 justify-content-center mt-3'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                // previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

const Restaurant = () => {
    console.log('renderHome');
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        if (currentUser) {
            dispatch(getAllUserPost(currentUser.id));
            console.log('dispatch home');
        }
        return () => {
            dispatch(removeAllUserResTaurant());
        };
    }, []);
    return <PaginatedItems itemsPerPage={8} />;
};

export default Restaurant;
