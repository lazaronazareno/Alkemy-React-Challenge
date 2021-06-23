import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function Layout(props) {
    return (
        <>
            <Header button={props}/>
            {props.children}
            <Footer />
        </>
    )
}

export default Layout;
