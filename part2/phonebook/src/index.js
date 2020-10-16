import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [ newName, setNewName ] = useState('');
    const [ counter, setCounter ] = useState(1);
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', id: counter }
    ]);

    const changeInputName = (e) => {
        setNewName(e.target.value);
    };

    const addName = (e) => {
        e.preventDefault();
        setPersons([ ...persons, { name: newName, id: counter + 1 } ]);
        setCounter(counter + 1);
        setNewName('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={changeInputName}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            { persons.map(item => <p key={item.id}>{ item.name }</p>) }
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
