import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'
import logo from "./logo.png";
import tripathi from './tripathi.png';
import './App.css';

const Home = () => {
    return (
        <>
            <div class='tripathi-logo'>
                <img src={logo} class='tripathi-logo' />
                <img src={tripathi} class='tripathi-logo' />
                <br />
            </div>
            <div class='tripathi-buttons'>
                <Link to={'/'}><span class="pixel">Back Home</span></Link>
                <Link to={`clickme`}><span class="pixel">Click Me Game</span></Link>
                <Link to={`complementme`}><div class="pixel">Compliment Me Game</div></Link>
                <Link to={`feedme`}><div class="pixel">Feed Me Game</div></Link>
            </div>
            <br />
            <div class='tripathi-logo'>
                Please enable sound for full experience!
            </div>
        </>
    )
}

export default Home;
