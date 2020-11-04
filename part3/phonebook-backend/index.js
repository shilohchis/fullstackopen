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

const generateId = () => {
    return Math.ceil(Math.random() * 100000);
};

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

app.delete('/api/persons/:id', (req, resp) => {
    books = books.filter(book => book.id !== Number(req.params.id));
    console.log(books);
    return resp.status(204).end();
});

app.post('/api/persons', (req, resp) => {
    const { name, number } = req.body;
    let col;
    if(!name && !number) {
        col = 'Name and number';
    } else {
        col = !name ? 'Name' : !number ? 'Number' : null;
    }
    if(col) {
        return resp.status(409).json({
            error: `${col} missing`
        });
    }
    books = books.concat({
        id: generateId(),
        name,
        number
    });
    console.log(books);
    return resp.status(201).end();
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
