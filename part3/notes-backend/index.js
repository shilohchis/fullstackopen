require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/note');

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, resp, next) => {
    console.log(err.message);

    if(err.name == 'CastError') {
        return resp.status(400).send({ error: 'malformatted id' });
    } else if(err.name == 'ValidationError') {
        return resp.status(400).send({ error: err.message });
    }

    next(err);
};

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
    Note.find({}).then(data => {
        response.json(data);
    });
});

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if(note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch(err => {
            next(err);
    });
});

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndRemove(request.params.id)
        .then(resp => {
            response.status(204).end();
        })
        .catch(err => next(err));
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body;
    const note = {
        content: body.content,
        important: body.important
    };

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(resp => {
            response.json(resp);
        })
        .catch(err => next(err));
});

app.post('/api/notes', (request, response, next) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    });

    note.save()
        .then(newNote => newNote.toJSON())
        .then(formattedNote => response.json(formattedNote))
        .catch(err => next(err));
})

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
