import Header from './Header';
import SideBar from './SideBar';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                <SideBar />
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
