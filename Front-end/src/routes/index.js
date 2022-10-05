import Home from '../pages/Home';
import SignIn from '../pages/signin';
import Upload from '../pages/Upload';
export const publicRoute = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/signin',
        component: SignIn,
        layout: null,
    },
    {
        path: '/upload',
        component: Upload,
        layout: null,
    },
];
export const privateRoute = [{}, {}];
