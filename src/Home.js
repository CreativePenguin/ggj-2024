import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

const Home = () => {
    return (
        <div>
            <div>
                <Link to={'/'}>Back Home</Link>
            </div>
            <div>
                <Link to={'clickme'}>Click Me Game</Link>
            </div>
            <div>
                <Link to={'complementme'}>Compliment Me Game</Link>
            </div>
        </div>
    )
}

export default Home;
