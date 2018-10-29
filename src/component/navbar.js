import React from 'react';
import { NavLink } from 'react-router-dom';
import Username from '../container/username';
const NavBar = (props) => {
    const style = { color: ' #fff ', background: '#007bff' }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <NavLink exact to="/"
                            className="nav-link"
                            activeStyle={style}
                        >Chat</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about"
                            className="nav-link"
                            activeStyle={style}
                        >About</NavLink>
                    </li>
                </ul>
               < Username />
            </div>
        </nav>
    )
}

export default NavBar;