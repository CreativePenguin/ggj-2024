import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'
import tripathi from './tripathi.png';
import './App.css';

const Home = () => {
    return (
        <div class='tripathi-logo'>
            <img src={tripathi} class='tripathi-logo' />
            <div>
                <Link to={'/'}>Back Home</Link>
            </div>
            <div>
                <Link to={`clickme`}>Click Me Game</Link>
            </div>
            <div>
                <Link to={`complementme`}>Compliment Me Game</Link>
            </div>
            <div>
                <Link to={`feedme`}>Feed Me Game</Link>
            </div>
        </div>
    )
}

export default Home;
