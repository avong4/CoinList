import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/">
    <div className ="Header">CoinListr</div>
    </Link>

    </div>
    );
}

export default Header;