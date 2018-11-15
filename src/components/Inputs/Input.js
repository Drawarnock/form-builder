import React, { Component } from 'react';
import './Input.css';
import SubInput from './SubInput'; 

class Input extends Component {

    componentnWillMount() {
        
    }

    render() {
        
        let subinputs
        if(this.props.subinputs) {
            subinputs = this.props.subinputs.map( (subinput, index ) => 
                <SubInput key={subinput.id}
                    question={subinput.question} 
                    type={subinput.type}
                    parentType = {subinput.parentType}
                    onDelete={() => this.props.onDeleteSubinput(subinput.id)}
                    createAnotherSubinput = {this.props.onCreateSubInput.bind(this, subinput.id)}
                    parentRefId ={subinput.parentId}
                    onChange = {this.props.onChange}
                    onSubinputChange = {(e) => this.props.subinputChanged(e, subinput.parentId, subinput.id, this.props.inputIndex)} 
                    onSetCondition={this.props.subinputCondition}/>)
        }

        return(
            <div>
                <div className="Input">
                    <div className="Form__group">
                        <label className="Form__label" htmlFor="question">Question</label>
                        <input onChange={this.props.onChange} className="Form__input" type="text" id="question" />
                    </div>
                    <div className="Form__group">
                        <label className="Form__label" htmlFor="type">Type</label>
                        <select onChange={this.props.onChange} className="Form__input" id="type">
                            <option value="text">TEXT</option>
                            <option value="radio">YES/NO</option>
                            <option value="number">NUMBER</option>
                        </select>
                    </div>
                    <div className="Form__controls">
                        <button className="Form__button" type="button" onClick={this.props.onCreateSubInput}>Add-Sub Input</button>
                        <button className="Form__button" type="button" onClick={this.props.onDelete}>Delete</button>
                    </div>        
                </div>
                {subinputs}
            </div>
        );
    }
}

export default Input;