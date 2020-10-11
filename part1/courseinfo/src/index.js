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

const Content = ({ parts }) => {
    const [first, second, third] = parts;
    return (
        <div>
            <Part data={ first }/>
            <Part data={ second }/>
            <Part data={ third }/>
        </div>
    );
}

const Total = ({ parts }) => (
    <p>Number of exercises { parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
);

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header course={ course.name } />
            <Content parts={ course.parts } />
            <Total parts={ course.parts } />
        </div>
    );
};
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
