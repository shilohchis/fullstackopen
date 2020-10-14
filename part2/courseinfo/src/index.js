import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState( Array(anecdotes.length).fill(0) );
    const [voteOfTheDay, setVoteOfTheDay] = useState(0);

    const randomAnecdotesSelector = () => setSelected( Math.floor( Math.random() * anecdotes.length ) );

    const giveVote = () => {
        const newVotes = [ ...votes ];
        newVotes[selected] = votes[selected] + 1;
        setVotes(newVotes);
        maxVote();
    };

    const maxVote = () => {
        const maxVal = votes.reduce((accumulator, val, index) => accumulator > val ? accumulator : val, 0);
        setVoteOfTheDay( votes.indexOf(maxVal) );
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{ anecdotes[selected] }</p>
            <p>has { votes[selected] } votes</p>
            <button onClick={ giveVote }>vote</button>
            <button onClick={ randomAnecdotesSelector }>next anecdote</button>

            <h1>Anecdote with most votes</h1>
            <p>{ anecdotes[voteOfTheDay] }</p>
            <p>has { votes[voteOfTheDay] } votes</p>
        </div>
    );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
