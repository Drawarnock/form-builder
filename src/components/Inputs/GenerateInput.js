import React from 'react';
import './Input.css';

const GenerateInput = (props) => {
    return(
        <div className="Input">
                <button type="button" onClick={props.generateInput} >ADD NEW INPUT</button>
        </div>
    );
}

export default GenerateInput;