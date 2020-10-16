import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FormBasic from './sections/FormBasic';
import FlatList from './components/FlatList';
import HeaderType from './components/HeaderType';

const App = () => {
    const [ newName, setNewName ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ counter, setCounter ] = useState(1);
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', phone: '040-1829102', id: counter }
    ]);

    const changeInputVal = ({ target: { value } }, type = null) => {
        switch (type) {
            case 'name':
                setNewName(value);
                break;
            default:
                setNewPhone(value);
        }
    };

    const resetInput = () => {
        setNewName('');
        setNewPhone('');
    };

    const addName = e => {
        e.preventDefault();
        const find = persons.find( obj => obj.name === newName );
        if(!find) {
            setPersons([ ...persons, { name: newName, phone: newPhone, id: counter + 1 } ]);
            setCounter(counter + 1);
            resetInput();
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    const dataForm = {
        button: { type: "submit", label: "add", submitHandler: addName },
        inputs: [
            { label: 'name', value: newName, valueHandler: changeInputVal },
            { label: 'phone', value: newPhone, valueHandler: changeInputVal },
        ]
    };

    return (
        <div>
            <HeaderType number={2} text="Phonebook"/>
            <FormBasic data={dataForm}/>
            <HeaderType number={2} text="Numbers"/>
            <FlatList datas={persons} showKeys={['name', 'phone']}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
