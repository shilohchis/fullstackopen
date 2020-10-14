import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, currVal) => {
        return acc + currVal.exercises;
    }, 0);

    return(
        <h3>Total of {sum} exercises</h3>
    );
};

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>;

const Content = ({ course }) => <div>{ course.parts.map(item => <Part key={item.id} part={item} />) }</div>;

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    );
};

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <>
            { courses.map(course => <Course key={course.id} course={course} />) }
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
