import React from 'react';
import "./Landing.css";
import { Link } from 'react-router-dom';

const landing = () => (
    <div className="Landing">
        <Link className="Link" to="/dashboard">Create your own forms</Link>
    </div>
);


export default landing;