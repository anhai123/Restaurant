import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.scss';
import clsx from 'clsx';
import './themify-icons.css';
import { getAllPost, getAllUserPost, removeAll } from '../../features/folder/postSlice';
import { Buffer } from 'buffer';
import { Navigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
function Items({ currentItems }) {
    console.log('render item');
    const [singlePost, setSinglePost] = useState();
    const handleClickImageEvent = (e) => {
        setSinglePost(e);
    };
    return (
        <Fragment>
            {singlePost ? (
                <Navigate to="/resDes" state={singlePost} replace={true} />
            ) : currentItems ? (
                <div className={clsx(style.allPostContainer)}>
                    {currentItems.map((element) => {
                        console.log('hello');
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
                </div>
            ) : (
                <div></div>
            )}
        </Fragment>
    );
}

function PaginatedItems({ itemsPerPage }) {
    const { AllUserPost } = useSelector((state) => state.post);
    let AllPost = useMemo(() => {
        return AllUserPost;
    }, [AllUserPost]);
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
            console.log('allpost > 0');
            setCurrentItems(AllPost.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(AllPost.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, AllPost, AllUserPost]);

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
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                containerClassName={'pagination justify-content-center mt-3'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

//main function
const Home = () => {
    const dispatch = useDispatch();
    console.log('render home');
    useEffect(() => {
        console.log('render home 1');
        dispatch(getAllPost());
        return () => {
            dispatch(removeAll());
        };
    }, [dispatch]);
    return <PaginatedItems itemsPerPage={8} />;
};
export default Home;
