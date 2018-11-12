import React, { Component } from 'react';
import './NewForm.css';
import Input from '../../components/Inputs/Input';
import GenerateInput from '../../components/Inputs/GenerateInput';

class NewForm extends Component {

    state = {
        form: {
            inputs: []
        }
    };

    generateInputHandler = () => {
        this.setState({ form: {
                inputs:  this.state.form.inputs.concat({id: Math.round(Math.random()*100000000), question: '', type: 'text'})
            } 
        });
    }

    generateSubInputHandler = (inputID, subinputId) => {
        let parentId,subinputs; 
        const inpIndex = this.state.form.inputs.findIndex( input => input.id === inputID);
        const inputs = [...this.state.form.inputs];
        const newInput = { ...this.state.form.inputs[inpIndex] };

        if(typeof subinputId === "number") {
            parentId = subinputId;
        } else {
            parentId = inputID;
        };

        if(this.state.form.inputs[inpIndex].subinputs) {
            subinputs = [...this.state.form.inputs[inpIndex].subinputs].concat({id: Math.round(Math.random()*100000000), parentId: parentId, question: '', condition: '', type: 'text', parentType: 'text'})
        } else {
            subinputs = [{id: Math.round(Math.random()*100000000), parentId: parentId, question: '', condition: '', type: 'text',  parentType: 'text'}]
        }
        newInput.subinputs = subinputs
        inputs.splice(inpIndex, 1, newInput)
        this.setState({
            form: {
                inputs: inputs
            }
        });
    }

    deleteInputHandler = (id) => {
        const inputs = [...this.state.form.inputs];
        const delIndex = inputs.findIndex(input => input.id === id);
        inputs.splice(delIndex, 1);
        this.setState({
            form: {
                inputs: inputs
            }
        });
    }

    deleteSubInputHandler = (inputId, subinputId) => {
        let inputs = [...this.state.form.inputs];
        const inputsIndex = inputs.findIndex(input => input.id === inputId);
        let subinputs = [...this.state.form.inputs[inputsIndex].subinputs];
        const delIndex = subinputs.findIndex(subinput => subinput.id === subinputId);
        subinputs.splice(delIndex, 1);
        inputs[inputsIndex].subinputs = subinputs;
        this.setState({
            form: {
                inputs: inputs
            }
        });
    }

    onInputChangeHandler = (e, id) => {
        const inputs = [...this.state.form.inputs];
        const updateIndex = inputs.findIndex(input => input.id === id);

        if(this.state.form.inputs[updateIndex].subinputs) { // change parentType property in direct subinputs

            const subinputs = [...this.state.form.inputs[updateIndex].subinputs];
            subinputs.map(subinput => {
                if(subinput.parentId === id) {
                    subinput.parentType = e.target.value
                }
                return subinput;
            });

            inputs[updateIndex].subinputs = subinputs
        }

        inputs[updateIndex] = {
            ...inputs[updateIndex],
            [e.target.id]: e.target.value
        }
        this.setState({
            form: {
                ...this.state.form,
                inputs: inputs
            }        
        });
    }

    onSubInputChangedHandler = (e, creatorInputId, subinputId, index) => {

        const inputs = [...this.state.form.inputs];
        let subinputs;
        let inputsIndex = inputs.findIndex(input => input.id === creatorInputId); // chech where find an input creator
      

        if(inputsIndex === -1) {
                inputsIndex = inputs[index].subinputs.findIndex(subinput => subinput.id === creatorInputId);
        } else { }

        subinputs = [...this.state.form.inputs[index].subinputs];
        const updateIndex = subinputs.findIndex(subinput => subinput.id === subinputId);

        if(this.state.form.inputs[index].subinputs) { // change parentType property in direct subinputs

           
            subinputs = subinputs.map(subinput => {
                if(subinput.parentId === creatorInputId) {

                    let parentIndex = inputs[index].id === creatorInputId ? index : -1;
                    subinput.parentType = inputs[index].type
                    if(parentIndex === -1) {
                        const parent = subinputs.find( input => input.id === creatorInputId);
                        console.log(parent);
                        subinput.parentType = parent.type;
                    }  
                }
                return subinput;
            });
            inputs[index].subinputs = subinputs
        }

        subinputs[updateIndex] = {
            ...subinputs[updateIndex],
            [e.target.id]: e.target.value
        }
        inputs[index].subinputs = subinputs;

        this.setState({
            form: {
                ...this.state.form,
                inputs: inputs
            }        
        });
    }

    onSaveFormHandler = e => {
        e.preventDefault();
        // console.log(this.state.form);
    }

    render () {
        console.log();
        let inputs = this.state.form.inputs.map( (input, index) => 
            <Input key={input.id} 
                   type={input.type} 
                   onDelete={() => this.deleteInputHandler(input.id)}
                   onDeleteSubinput={this.deleteSubInputHandler.bind(this, input.id)}  
                   onCreateSubInput = {this.generateSubInputHandler.bind(this, input.id)}
                   onChange = {(e) => this.onInputChangeHandler(e, input.id)}
                   subinputs = {input.subinputs}
                   inputs = {this.state.form.inputs}
                   inputRefId={input.id}
                   subinputChanged = {this.onSubInputChangedHandler}
                   inputIndex = {index}
                   />
        );

        return(
            <div className="NewForm">
                <form onSubmit={this.onSaveFormHandler}>
                    {inputs}
                    <GenerateInput generateInput={this.generateInputHandler} />
                    <input type="submit" value="SAVE FORM" />
                </form>
            </div>
        );
    }
}

export default NewForm;