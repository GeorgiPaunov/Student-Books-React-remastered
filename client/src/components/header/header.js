import React from 'react';
import NavBar from './navbar';

const Header = (props) => {
    return <NavBar username={props.username} isAdmin={props.isAdmin} logout={props.logout}/>
};

export default Header;