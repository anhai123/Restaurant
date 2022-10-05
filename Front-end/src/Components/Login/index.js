import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../features/folder/authSlice';
import { clearMessage } from '../../features/folder/messageSlice';
import style from './styles.module.scss';
import clsx from 'clsx';
const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const initialValues = {
        username: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('This field is required!'),
        password: Yup.string().required('This field is required!'),
    });
    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                props.history.push('/profile');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }
    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.SignInForm)}>
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                    <Form>
                        <div className={clsx(style.content)}>
                            <label htmlFor="username" className={clsx(style.label)}>
                                Username
                            </label>
                            <Field name="username" type="text" className={clsx(style.input)} />
                            <ErrorMessage name="username" component="div" className="alert alert-danger" />
                        </div>
                        <div className={clsx(style.content)}>
                            <label htmlFor="password" className={clsx(style.label)}>
                                Password
                            </label>
                            <Field name="password" type="password" className={clsx(style.input)} />
                            <ErrorMessage name="password" component="div" className="alert alert-danger" />
                        </div>
                        <div className={clsx(style.buttonCover)}>
                            <button type="submit" className={clsx(style.signInButton)} disabled={loading}>
                                {loading && <span className="spinner-border spinner-border-sm"></span>}
                                <span>Login</span>
                            </button>
                        </div>
                    </Form>
                </Formik>
                <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div className={clsx(style.buttonCover)}>
                        <span>Already have an account?</span>
                        <button type="submit" className={clsx(style.registerButton)} disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            <span>Register</span>
                        </button>
                    </div>
                </Link>
            </div>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger blue" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Login;
