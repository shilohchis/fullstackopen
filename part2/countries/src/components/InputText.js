import React from 'react';

const InputText = ({ label, inputVal, changeInputVal }) => {
    return (
        <div>
            <label>{ label }</label>
            <input value={inputVal} onChange={changeInputVal}/>
        </div>
    );
};

export default InputText;
