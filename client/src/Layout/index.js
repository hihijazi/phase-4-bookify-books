import { Outlet } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import backgroundImage from '../images/background.png';

/**
 * The layout component for the application.
 * Renders the main content of the application.
 */

const appBackgroundStyles = {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'fixed', // Corrected from 'backgroundattachment' to 'backgroundAttachment'
    backgroundRepeat: 'no-repeat', // Corrected from 'backgroundrepeat' to 'backgroundRepeat'
    overflow: 'auto'
};

const Layout = () => {
    return (
        <div className={'mainContainer'} >
            <div style={appBackgroundStyles}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Layout;