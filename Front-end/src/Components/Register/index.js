import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../features/folder/authSlice';
import { clearMessage } from '../../features/folder/messageSlice';
import style from './styles.module.scss';
import clsx from 'clsx';
const Register = () => {
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                'len',
                'The username must be between 3 and 20 characters and not contain spacing character',
                (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20 &&
                    val.toString().toLocaleLowerCase().indexOf(' ') === -1,
            )
            .required('This field is required!'),
        email: Yup.string().email('This is not a valid email.').required('This field is required!'),
        password: Yup.string()
            .test(
                'len',
                'The password must be between 6 and 40 characters.',
                (val) => val && val.toString().length >= 6 && val.toString().length <= 40,
            )
            .required('This field is required!'),
    });
    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;
        setSuccessful(false);
        dispatch(register({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };
    return (
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.SignInForm)}>
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                    <Form>
                        {!successful && (
                            <div>
                                <div className={clsx(style.content)}>
                                    <label htmlFor="username" className={clsx(style.label)}>
                                        Username
                                    </label>
                                    <Field name="username" type="text" className={clsx(style.input)} />
                                    <ErrorMessage name="username" component="div" className="alert alert-danger" />
                                </div>
                                <div className={clsx(style.content)}>
                                    <label htmlFor="email" className={clsx(style.label)}>
                                        Email
                                    </label>
                                    <Field name="email" type="text" className={clsx(style.input)} />
                                    <ErrorMessage name="email" component="div" className="alert alert-danger" />
                                </div>

                                <div className={clsx(style.content)}>
                                    <label htmlFor="password" className={clsx(style.label)}>
                                        Password
                                    </label>
                                    <Field name="password" type="password" className={clsx(style.input)} />
                                    <ErrorMessage name="password" component="div" className="alert alert-danger" />
                                </div>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <div className={clsx(style.buttonCover)}>
                                        <button type="submit" className={clsx(style.signInButton)}>
                                            <span>Sign Up</span>
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
            {message && (
                <div className={clsx(style.content)}>
                    <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Register;
