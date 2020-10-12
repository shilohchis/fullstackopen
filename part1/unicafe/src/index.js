import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{ title }</h1>;

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{ text }</button>;

const Display = ({ text, value }) => <p>{ text } { value }</p>

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const goodClickHandler = () => {
        setGood(good + 1);
    };

    const neutralClickHandler = () => {
        setNeutral(neutral + 1);
    };

    const badClickHandler = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <Header title="give feedback"/>
            <Button text="good" clickHandler={goodClickHandler}/>
            <Button text="neutral" clickHandler={neutralClickHandler}/>
            <Button text="bad" clickHandler={badClickHandler}/>
            <Display text="good" value={good}/>
            <Display text="neutral" value={neutral}/>
            <Display text="bad" value={bad}/>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
