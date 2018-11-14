import React, { Component } from 'react';
import './NewForm.css';
import Input from '../../components/Inputs/Input';
import GenerateInput from '../../components/Inputs/GenerateInput';
import { db } from '../../indexedDB';

class NewForm extends Component {

    componentDidMount() {
    }

    state = {
        form: {
            formId: Math.round(Math.random()*100000000),
            title: 'title',
            description:'description',
            inputs: []
        }
    };

    generateInputHandler = () => {
        this.setState({ form: {
                ...this.state.form,
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
        const parentObj = this.state.form.inputs.find( input => input.id === parentId) || this.state.form.inputs[inpIndex].subinputs.find( subinput => subinput.id === parentId);

        if(this.state.form.inputs[inpIndex].subinputs) {

            subinputs = [...this.state.form.inputs[inpIndex].subinputs].concat({id: Math.round(Math.random()*100000000), parentId: parentId, question: '', condition: '', type: 'text', parentType: parentObj.type || 'text' });
        } else {

            subinputs = [{id: Math.round(Math.random()*100000000), parentId: parentId, question: '', condition: '', type: 'text',  parentType: parentObj.type || 'text'}]
        }
        newInput.subinputs = subinputs
        inputs.splice(inpIndex, 1, newInput)
        this.setState({
            form: {
                ...this.state.form,
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
                if(subinput.parentId === subinputId) {
                    subinput.parentType = e.target.value;
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
        const form = this.state.form;
          db.forms.put(form).then (function(){
              return db.forms.get({formId: form.formId});
          }).then(function (form) {

              console.log(form)
          }).catch(function(error) {

             console.log(error);
          });
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
                    <label htmlFor="title" >Title: </label>
                    <input type="text" id="title" />
                    <label htmlFor="description" >Description: </label>
                    <textarea type="text" id="description" ></textarea>
                    {inputs}
                    <GenerateInput generateInput={this.generateInputHandler} />
                    <input type="submit" value="SAVE FORM" />
                </form>
            </div>
        );
    }
}

export default NewForm;