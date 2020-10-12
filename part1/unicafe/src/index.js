import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{ title }</h1>;

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{ text }</button>;

const Statistics = ({ good, neutral, bad }) => {
    const goodScore = 1;
    const neutralScore = 0;
    const badScore = 1;

    const avgScore = () => {
        const totalScore = (goodScore * good) + (neutralScore * neutral) - (badScore * bad);
        const totalCount = good + neutral + bad;
        return totalScore / totalCount || 0;
    };

    const positivePercentage = () => {
        return `${( good / (good + neutral + bad) ) * 100 || 0} %`;
    };

    if(!good && !neutral && !bad) {
        return <p>No feedback given</p>;
    } else {
        return (
            <div>
                <Header title="statistics"/>
                <table>
                    <tbody>
                        <Statistic text="good" value={good}/>
                        <Statistic text="neutral" value={neutral}/>
                        <Statistic text="bad" value={bad}/>
                        <Statistic text="all" value={good + neutral + bad}/>
                        <Statistic text="average" value={avgScore()}/>
                        <Statistic text="positive" value={positivePercentage()}/>
                    </tbody>
                </table>
            </div>
        );
    }
};

const Statistic = ({ text, value }) => (
    <tr>
        <td>{ text }</td>
        <td>{ value }</td>
    </tr>
);

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
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
