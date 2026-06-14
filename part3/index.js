import express from "express";
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

const generateId = () => {
  const maxId = notes.length > 0 ?
    Math.max(...notes.map(note => Number(note.id)))
    :
    0;

  const newId = String(maxId + 1);
  return newId;
}

app.post('/api/notes', (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: 'content is missing'
    })
  }
  const newNote = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(newNote);
  res.json(notes);
})


app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find(note => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.filter(note => note.id === id);

  res.status(204).end();
});

app.listen(3000, () => {
  console.log('Server has started on port 3000')
})