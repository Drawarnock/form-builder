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
            let style;
            if(this.props.created) {

                style = {
                    padding:'10px 20px',
                    cursor: 'auto'
                };

                created = (
                <>
                    <h3> Title: {this.props.title}</h3>
                    <p>Description: {this.props.description}</p>
                    <div className="FormThumbnail__controls">
                        <button className="FormThumbnail__button" onClick={this.detailsClickHandler}>See details</button>
                        <button className="FormThumbnail__button" onClick={() => this.props.onDeleteForm(this.props.formId)}>Delete form</button>
                    </div>
                </>
                );
            }
            return(
                <div className="FormThumbnail" style={style}>
                {created}

            </div>
            );
        }
}

export default withRouter(FormThumbnail);