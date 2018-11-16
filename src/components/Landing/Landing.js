import React from 'react';
import "./Landing.css";
import { Link } from 'react-router-dom';

const landing = () => (
    <div className="Landing">
        <h2 className="Landing__title">Create your forms whatever you want</h2>
        <Link className="Landing__cta" to="/dashboard">Start now!</Link>
    </div>
);


export default landing;