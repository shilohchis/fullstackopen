import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{ title }</h1>;

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{ text }</button>;

const Display = ({ text, value }) => <p>{ text } { value }</p>

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const goodScore = 1;
    const neutralScore = 0;
    const badScore = 1;

    const goodClickHandler = () => {
        setGood(good + 1);
    };

    const neutralClickHandler = () => {
        setNeutral(neutral + 1);
    };

    const badClickHandler = () => {
        setBad(bad + 1);
    };

    const avgScore = () => {
        const totalScore = (goodScore * good) + (neutralScore * neutral) - (badScore * bad);
        const totalCount = good + neutral + bad;
        return totalScore / totalCount || 0;
    };

    const positivePercentage = () => {
        return `${( good / (good + neutral + bad) ) * 100 || 0} %`;
    };

    return (
        <div>
            <Header title="give feedback"/>
            <Button text="good" clickHandler={goodClickHandler}/>
            <Button text="neutral" clickHandler={neutralClickHandler}/>
            <Button text="bad" clickHandler={badClickHandler}/>
            <Header title="statistics"/>
            <Display text="good" value={good}/>
            <Display text="neutral" value={neutral}/>
            <Display text="bad" value={bad}/>
            <Display text="all" value={good + neutral + bad}/>
            <Display text="average" value={avgScore()}/>
            <Display text="positive" value={positivePercentage()}/>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
