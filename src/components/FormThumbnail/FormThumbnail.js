import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './FormThumbnail.css';

class FormThumbnail extends Component {

        detailsClickHandler = () => {
            if(this.props.created) {
                this.props.history.push(this.props.match.url + '/form/' + this.props.formId);
            } else {
                this.props.history.push(this.props.match.url + '/new-form');
            }
        }

        render() {
            let created = <div className="FormThumbnail__newForm" onClick={this.detailsClickHandler}>Create new form</div>;

            if(this.props.created) {
                created = (
                <>
                    <h3> Title: {this.props.title}</h3>
                    <p>Description: {this.props.description}</p>
                    <button onClick={this.detailsClickHandler}>See details</button>
                    <button onClick={() => this.props.onDeleteForm(this.props.formId)}>Delete form</button>
                </>
                );
            }
            return(
                <div className="FormThumbnail" >
                {created}

            </div>
            );
        }
}

export default withRouter(FormThumbnail);