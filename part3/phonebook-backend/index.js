const express = require('express');
const app = express();
app.use( express.json() );

let books = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

app.get('/', (req, resp) => {

});

app.get('/api/persons', (req, resp) => {
    return resp.status(200).json(books);
});

app.get('/api/persons/:id', (req, resp) => {
    const person = books.find(book => book.id === Number(req.params.id));
    if(person) {
        return resp.status(200).json(person);
    }
    return resp.status(404).end();
});

app.get('/info', (req, resp) => {
    return resp.send(`
        <p>Phonebook has info for ${books.length} people</p>
        <p>${new Date()}</p>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
