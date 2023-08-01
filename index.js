const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PhoneBook = require('./phonebook');

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

function getRequestBodyAsString(req) {
    return JSON.stringify(req.body);
}

morgan.token('req-body', getRequestBodyAsString);

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :req-body',
    ),
);

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mar Poppendieck',
        number: '39-23-6423122',
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res, next) => {
    //res.json(persons);
    PhoneBook.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    console.log(req.params);
    PhoneBook.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.get('/api/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`,
    );
});

app.delete('/api/persons/:id', (req, res, next) => {
    PhoneBook.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    if (Object.keys(body).length === 0) {
        return response.status(400).json({
            error: 'content missing',
        });
    }

    const person = new PhoneBook({
        name: body.name,
        number: body.number,
    });

    person
        .save({ runValidators: true })
        .then((newPerson) => newPerson.toJSON())
        .then((newPerson) => {
            console.log(newPerson);
            console.log(
                'added ' +
                    body.name +
                    ' number ' +
                    body.number +
                    ' to phonebook',
            );
            response.json(newPerson);
        })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    PhoneBook.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
