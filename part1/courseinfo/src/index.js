import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (
    <h1>{ course }</h1>
);

const Content = ({ data }) => {
    const [first, second, third] = data;
    console.log(first, second, third);
    return (
        <>
            <p>{ first.part } { first.exercise }</p>
            <p>{ second.part } { second.exercise }</p>
            <p>{ third.part } { third.exercise }</p>
        </>
    );
}

const Total = ({ total }) => (
    <p>Number of exercises { total }</p>
);

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercise1 = 10;
    const part2 = 'Using props to pass data';
    const exercise2 = 7;
    const part3 = 'State of component';
    const exercise3 = 14;
    return (
        <div>
            <Header course={ course } />
            <Content data={[
                { part: part1, exercise: exercise1 },
                { part: part2, exercise: exercise2 },
                { part: part3, exercise: exercise3 },
            ]}/>
            <Total total={ exercise1 + exercise2 + exercise3 }/>
        </div>
    );
};
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
