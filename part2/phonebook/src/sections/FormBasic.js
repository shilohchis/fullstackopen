import React from 'react';
import Button from '../components/Button';
import InputText from '../components/InputText';

const FormBasic = ({ data }) => {
    const { button, inputs } = data;
    const { type, label, submitHandler } = button;
    return (
        <form onSubmit={submitHandler}>
            {
                inputs.map(item => {
                    const { label, value, valueHandler } = item;
                    return (
                        <InputText key={label} label={`${label}:`} inputVal={value} changeInputVal={e => valueHandler(e, label)}/>
                    );
                })
            }
            <Button type={type} label={label} />
        </form>
    );
}

export default FormBasic;
