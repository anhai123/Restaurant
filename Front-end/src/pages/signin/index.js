import style from './signin.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
function SignIn() {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const handleRegister = () => {};
    return (
        <div className={clsx(style.wrapper)}>
            <form className={clsx(style.SignInForm)}>
                <div className={clsx(style.content)}>
                    <label className={clsx(style.label)} for="email">
                        Email
                    </label>
                    <input
                        className={clsx(style.input)}
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className={clsx(style.content)}>
                    <label className={clsx(style.label)} for="password">
                        Password
                    </label>
                    <input
                        className={clsx(style.input)}
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>

                <div>
                    <input className={clsx(style.remember)} type="checkbox" name="remember" id="remember" />
                    <label className={clsx(style)} for="remember">
                        Remember me
                    </label>
                </div>

                <button className={clsx(style.signInButton)} type="submit">
                    Sign In
                </button>

                <p className={clsx(style)}>
                    <a className={clsx(style.forgetPassword)} href="">
                        Forget Password?
                    </a>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
