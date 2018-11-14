import React, { Component } from 'react';
import './Dashboard.css';
import FormThumbnail from '../../components/FormThumbnail/FormThumbnail';
import { db } from  '../../indexedDB';
class Dashboard extends Component {

    componentDidMount() {
        db.forms.each( form => {
            this.setState({forms: this.state.forms.concat(form)});
        });
    }

    state = {
        forms: []
    }

    render() {

        const forms = this.state.forms.map( form => 
        <FormThumbnail  key={form.formId} created={true}
                        title = {form.title}
                        description={form.description}
                        formId={form.formId}/>)


        return(
            <div className="Dashboard">
                <h2 style={{ fontSize: '36px', marginBottom: '80px', textTransform: "uppercase" }}>Your Forms:</h2>
                <div className="Dashboard__container">
               
                    <FormThumbnail created={false} />
                    {forms}
                </div>
            </div>
        )
    }
}

export default Dashboard;