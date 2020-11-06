require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Phone = require('./models/phone');

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

app.get('/', (req, resp) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, resp) => {
    Phone.find({}).then(res => {
        resp.json(res);
    });
});

app.get('/api/persons/:id', (req, resp) => {
    Phone.findById(req.params.id)
        .then(res => {
            return resp.json(res);
    });
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
