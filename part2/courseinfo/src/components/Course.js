import React from 'react';

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

export default Course;
