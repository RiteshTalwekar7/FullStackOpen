import express, { json, request } from "express";
import morgan from 'morgan';
import cors from 'cors';
import Phone from "./models/phonebook.js";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 3001;
const app = express();

// let phonebook = [
//   {
//     "id": "1",
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": "2",
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": "3",
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": "4",
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

app.use(express.static('dist'));
app.use(cors());

// morgan.token('details', (req, res) => {
//   return `{"name":"${req.body.newObject.name}","number":"${req.body.newObject.number}"}`
// })

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/api/persons/', (request, response) => {
  Phone.find({}).then(phonebook => {
    response.status(200).send(phonebook);
  })
});

app.get('/info', (request, response) => {
  const date = new Date();
  Phone.find({}).then(phonebook => {
    const info = {
      phonebook: `Phonebook has info for ${phonebook.length} people`,
      date
    }
    response.status(200).send(info);
  })
});

function generateIdInRange(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(result => {
      response.json(result);
    })
    .catch(error => next(error));
});


app.post('/api/persons/', (request, response, next) => {
  console.log(request.body);
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(401).json({
      error: 'content is missing'
    })
  }
  const newPerson = new Phone({
    name: name,
    number: number
  });
  // const recordExists = phonebook.filter(phone => phone.name === body.name);
  // if (recordExists) {
  //   return response.status(401).send({
  //     error: 'name must be unique'
  //   });
  // }
  newPerson.save()
    .then(savedPerson => {
      response.status(200).json(savedPerson);
    })
    .catch(error => next(error));
});


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  const { id } = request.params;

  Phone.findById(id)
    .then(result => {
      if (!result) {
        return response.status(400).end();
      }
      result.name = name;
      result.number = number;
      return result.save().then(updatedPhone => {
        console.log(updatedPhone);
        response.json(updatedPhone);
      })
    })
    .catch(error => next(error));

})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  Phone.findByIdAndDelete(id)
    .then(result => {
      response.json(result);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error);
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
})