import React, { Component} from 'react';
import { db } from '../../indexedDB';

class GeneratedForm extends Component {

    state = {
        form: {
            formId: null,
            title: '',
            description: '',
            inputs: []
        }
    }

    componentWillMount() {

        const paramID = this.props.match.params.id;
        db.forms.get({formId: parseInt(paramID)}).then((form) =>{

            this.setState({form: form})

        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        let inputs = null;

            if(this.state.form.inputs.length) {

                inputs = this.state.form.inputs.map( input => {

                    let subinputs = "no subinputs";
                    if(input.subinputs) {
                        subinputs = input.subinputs.map( subinput => {
                            return(
                             <ul key={subinput.id}>
                                 <li>subinput condition: {subinput.parentQuestionCondition} = {subinput.parentQuestionAnswer}</li>
                                 <li>subinputId: {subinput.id}</li>
                                 <li>subinput parentId: {subinput.parentId}</li>
                                 <li>subinput parent type: {subinput.parentType}</li>
                                 <li>question: {subinput.question}</li>
                                 <li>type: {subinput.type}</li>
                             </ul>
                            )
                        });
                    }
                    
                    return( 
                    <ul key={input.id}>
                        <li>inputId: {input.id}</li>
                        <li>question: {input.question}</li>
                        <li>type: {input.type}</li>
                        <li> subinputs: {subinputs}
     
                        </li>
                    </ul>)
                });
            }
  

        return(
            <div>
                <h2>Form title: {this.state.form.title}</h2>
                <p>Form ID: {this.state.form.formId}</p>
                <p>Form description: {this.state.form.description}</p>
                <div>
                    Structure:
                    {inputs}
                </div>
            </div>
        )
    }
} 

export default GeneratedForm;