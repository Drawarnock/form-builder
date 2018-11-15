import React, { Component } from 'react';
import './Dashboard.css';
import FormThumbnail from '../../components/FormThumbnail/FormThumbnail';
import { db } from  '../../indexedDB';
class Dashboard extends Component {

    componentDidMount() {
        this.fetchForms();
    }

    state = {
        forms: []
    }

    deleteFormHandler = async (id) => {
        await db.forms.where({formId: id}).delete();
        const forms = [...this.state.forms];
        const delIndex = forms.findIndex( form => form.id === id);
        forms.splice(delIndex,1)
        await this.setState({
            forms: forms
        });
    }

    fetchForms = async () => {
        await db.forms.each( async form => {
            await this.setState({forms: this.state.forms.concat(form)});
        });
    }

    render() {

        const forms = this.state.forms.map( form => 
        <FormThumbnail  key={form.formId} created={true}
                        title = {form.title}
                        description={form.description}
                        formId={form.formId}
                        onDeleteForm ={this.deleteFormHandler}/>)


        return(
            <div className="Dashboard">
                <h2 style={{ fontSize: '36px', marginBottom: '80px', textTransform: "uppercase", color: "#dedede" }}>Your Forms:</h2>
                <div className="Dashboard__container">
                    {forms}
                    <FormThumbnail created={false} />
                </div>
            </div>
        )
    }
}

export default Dashboard;