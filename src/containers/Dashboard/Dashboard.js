import React, { Component } from 'react';
import './Dashboard.css';
import FormThumbnail from '../../components/FormThumbnail/FormThumbnail';

class Dashboard extends Component {

    state = {
        forms: [
            {
                title: 'Cars',
                description: 'sasdas',
                inputs: [

                ]
            }
        ]
    }

    render() {
        return(
            <div className="Dashboard">
               
                <div className="Dashboard__container">
                <h2 style={{ fontSize: '36px', marginBottom: '80px', textTransform: "uppercase" }}>Your Forms:</h2>
                    <FormThumbnail created={false} />
                </div>
            </div>
        )
    }
}

export default Dashboard;