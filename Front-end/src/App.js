import { BrowserRouter as Router, Routes, Route, Redirect, Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicRoute } from './routes';
import { DefaultLayout } from './Components/Layout';
import { Fragment } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import BoardUser from './Components/BoardUser';
import BoardModerator from './Components/BoardModerator';
import BoardAdmin from './Components/BoardAdmin';
import Home from './Components/Home';
import MyRestaurant from './Components/MyRestaurant';
import RestaurantDetail from './Components/RestaurantDetail';
import { logout } from './features/folder/authSlice';
import { getAllUserPost } from './features/folder/postSlice';
import EventBus from './common/EventBus';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantLogo from './assets/RestaurantLogo.png';
import { history } from './helpers/history';
function App() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
            setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }
        EventBus.on('logout', () => {
            logOut();
        });
        return () => {
            EventBus.remove('logout');
        };
    }, [currentUser, logOut]);
    return (
        // <Router>
        //     <div className="App">
        //         <Routes>
        //             {publicRoute.map((route, index) => {
        //                 let Layout = DefaultLayout;
        //                 if (route.layout) {
        //                     Layout = route.layout;
        //                 } else if (route.layout === null) {
        //                     Layout = Fragment;
        //                 }
        //                 const Component = route.component;
        //                 return (
        //                     <Route
        //                         path={route.path}
        //                         element={
        //                             <Layout>
        //                                 <Component />
        //                             </Layout>
        //                         }
        //                     />
        //                 );
        //             })}
        //         </Routes>
        //     </div>
        // </Router>
        <Router>
            <div>
                {/* <!-- Navbar --> */}
                {currentUser && (
                    <nav class="navbar navbar-expand-lg navbar-light  background-color">
                        {/* <!-- Container wrapper --> */}
                        <div class="container-fluid">
                            {/* <!-- Collapsible wrapper --> */}
                            <div class="LeftNavbarContent" id="navbarSupportedContent">
                                {/* <!-- Navbar brand --> */}
                                <a class="navbar-brand mt-2 mt-lg-0" href="#">
                                    <img src={RestaurantLogo} height="40px" alt="MDB Logo" loading="lazy" />
                                </a>
                                {/* <!-- Left links --> */}

                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link to={'/home'} className="nav-link text-white">
                                            <strong>Home</strong>
                                        </Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to={'/my-restaurant'} className="nav-link text-white">
                                            <strong>My restaurant</strong>
                                        </Link>
                                    </li>
                                </ul>

                                {/* <!-- Left links --> */}
                            </div>

                            {/* <!-- Collapsible wrapper --> */}

                            {/* <!-- Right elements --> */}
                            <div class="d-flex align-items-center">
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={'/profile'} className="nav-link text-white">
                                            Welcome <strong> {currentUser.username}</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link text-white" onClick={logOut}>
                                            <strong>Log Out</strong>
                                        </a>
                                    </li>
                                </div>
                            </div>
                            {/* <!-- Right elements --> */}
                        </div>
                        {/* <!-- Container wrapper --> */}
                    </nav>
                )}

                <div>
                    <Routes>
                        <Route path="/resDes" element={<RestaurantDetail />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user" element={<BoardUser />} />
                        <Route path="/mod" element={<BoardModerator />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/my-restaurant" element={<MyRestaurant />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
