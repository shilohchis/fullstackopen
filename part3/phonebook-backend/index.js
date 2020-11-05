const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
// ------------ MIDDLEWARE ------------
const requestLogger = (req, resp, next) => {
    const { method, path, body } = req;
    console.log('Method:', method);
    console.log('Path:', path);
    console.log('Body:', body);
    console.log('--------');
    next();
};

const unknownEndpoint = (req, resp) => {
    resp.status(404).json({
        error: 'unknown endpoint'
    });
};

morgan.token('resp-body', (req, resp) => {
    return JSON.stringify(req.body);
});
// ------------ MIDDLEWARE ------------
app.use(requestLogger);
app.use( cors() );
app.use( express.json() );
app.use( morgan(':method :url :status :res[content-length] - :response-time ms :resp-body') );
app.use( express.static('build') );

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
    const book = books.find(book => book.name.toLowerCase() === name.toLowerCase());
    if(book) {
        return resp.status(409).json({
            error: 'Duplicate name'
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

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
