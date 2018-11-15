import React, { Component } from 'react';
import './Input.css';

class SubInput extends Component {

    render() {

        let conditionOpt, answer;

        if(this.props.parentType === 'text' || this.props.parentType === 'radio') { 
            conditionOpt = <option value="Equals">Equals</option>
        } else {

            conditionOpt = (
            <>
                <option value="Equals">Equals</option>
                <option value="Greater">Greather than</option>
                <option value="Less">Less than</option>
            </>)
        }

        if (this.props.parentType === 'radio') {

            answer = 
                (<select className="Form__input" id="parentQuestionAnswer" onChange={this.props.onSubinputChange}>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                </select>)
        } else if (this.props.parentType === 'number') {
            answer = <input className="Form__input" id="parentQuestionAnswer" type="number" onChange={this.props.onSubinputChange} />
        } else {
            answer = <input className="Form__input" id="parentQuestionAnswer" type="text" onChange={this.props.onSubinputChange} />
        }
        return(
            <div className="SubInput">
                <div className="Form__group">
                    <label className="Form__label" htmlFor="equals">Condition</label>
                    <select onChange={this.props.onSubinputChange} className="Form__input" id="parentQuestionCondition">
                        {conditionOpt}
                    </select>
                    <div className="Form__parent-value">{answer}</div>
                </div>
                <div className="Form__group">
                    <label className="Form__label" htmlFor="question">Question</label>
                    <input onChange={this.props.onSubinputChange} className="Form__input" type="text" id="question" />
                </div>
                <div className="Form__group">
                    <label className="Form__label" htmlFor="type">Type</label>
                    <select onChange={this.props.onSubinputChange} className="Form__input" id="type">
                        <option value="text">TEXT</option>
                        <option value="radio">YES/NO</option>
                        <option value="number">NUMBER</option>
                    </select>
                </div>
                <div className="Form__controls">
                    <button className="Form__button" type="button" onClick={this.props.createAnotherSubinput}>Add-Sub Input</button>
                    <button className="Form__button" type="button" onClick={this.props.onDelete}>Delete</button>
                </div>        
            </div>
        );
    }
}

export default SubInput;