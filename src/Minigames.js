import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Minigames = () => {
    <>
        <nav><Link to={"/"}>Go Home</Link></nav>
        <Outlet />
    </>
}

export default Minigames;
