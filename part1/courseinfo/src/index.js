import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (
    <h1>{ course }</h1>
);

const Part = ({ data }) => {
    const { name, exercise } = data;
    return (
        <p>{ name } { exercise }</p>
    );
};

const Content = ({ data }) => {
    const [first, second, third] = data;
    return (
        <div>
            <Part data={ first }/>
            <Part data={ second }/>
            <Part data={ third }/>
        </div>
    );
}

const Total = ({ total }) => (
    <p>Number of exercises { total }</p>
);

const App = () => {
    const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14
    };

    return (
        <div>
            <Header course={ course } />
            <Content data={[
                part1,
                part2,
                part3,
            ]}/>
            <Total total={ part1.exercises + part2.exercises + part3.exercises }/>
        </div>
    );
};
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
