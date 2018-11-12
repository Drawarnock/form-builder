import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './FormThumbnail.css';

class FormThumbnail extends Component {

        thumbnailClickHandler = () => {
            if(this.props.created) {
                this.props.history.push(this.props.match.url + '/id');
            } else {
                this.props.history.push(this.props.match.url + '/new-form');
            }
        }


        render() {
            let created = <div className="FormThumbnail__newForm">Create new form</div>;

            if(this.props.created) {
                created = (
                <>
                    <h3> Title: {this.props.title}</h3>
                    <p>Description: {this.props.description}</p>
                </>
                );
            }
            return(
                <div className="FormThumbnail" onClick={this.thumbnailClickHandler}>
                {created}
            </div>
            );
        }
}

export default withRouter(FormThumbnail);