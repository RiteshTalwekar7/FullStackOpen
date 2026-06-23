import { useEffect, useState } from 'react';
import Note from './components/Note';
import axios from 'axios';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);


  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/api/notes/${id}`;
    const noteToEdit = notes.find((note) => note.id == id);
    const changeNote = { ...noteToEdit, important: !noteToEdit.important };
    noteService
      .update(id, changeNote)
      .then(updatedNote => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
      })
      .catch(error => {
        setErrorMsg(`The note ${note.content} was already deleted from the server`)
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    noteService
      .create(noteObject)
      .then(newNote => setNotes(notes.concat(newNote)));
    setNewNote('');
  }

  const NewNoteHandler = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type='text'
          value={newNote} onChange={NewNoteHandler}
        />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App