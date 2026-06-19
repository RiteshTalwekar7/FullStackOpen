import express, { json } from "express";
import morgan from 'morgan';
import cors from 'cors';
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 3001;
const app = express();

let phonebook = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.use(cors());

// morgan.token('details', (req, res) => {
//   return `{"name":"${req.body.newObject.name}","number":"${req.body.newObject.number}"}`
// })

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.get('/api/persons/', (request, response) => {
  response.status(200).send(phonebook);
});

app.get('/info', (request, response) => {
  const date = new Date();
  const info = {
    phonebook: `Phonebook has info for ${phonebook.length} people`,
    date
  }
  response.status(200).send(info);
});

function generateIdInRange(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


app.post('/api/persons/', (request, response) => {
  console.log(request.body);
  const { name, number, id } = request.body;
  if (!name || !number) {
    return response.status(401).json({
      error: 'content is missing'
    })
  }

  const newPerson = {
    id: id || generateIdInRange(10, 10000),
    name: name,
    number: number
  };

  // // const recordExists = phonebook.filter(phone => phone.name === body.name);
  // // if (recordExists) {
  // //   return response.status(401).send({
  // //     error: 'name must be unique'
  // //   });
  // // }

  phonebook.push(newPerson);
  response.status(200).json(newPerson);
});

app.get('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  const record = phonebook.find(user => user.id === id);
  if (!record) {
    return response.status(401).json({
      error: 'given id not found or is unappropriate'
    })
  }
  response.status(200).send(record);
});

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  const record = phonebook.find(phone => phone.id == id);
  if (!record) {
    return response.status(401).json({
      error: `the information of the person with id ${id} is already deleted or not found`
    })
  }
  phonebook = phonebook.filter(user => user.id !== id);
  response.status(200).json(record)
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
})