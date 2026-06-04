import { useState } from 'react';
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearch = () => {
    console.log(event.target.value);
    setSearchName(event.target.value);
    setFilteredArray(persons.filter(person => person.name.toLowerCase().includes(searchName)));
  }

  const addInfo = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} already exists in the phonebook`)
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newPerson));
  }

  console.log(persons)
  return <>
    <div>
      <h1>Phonebook</h1>
      <SearchFilter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm addInfo={addInfo} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      {searchName ? filteredArray.map(person => <p key={person.key}>{person.name} {person.number}</p>) : persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  </>
}

export default App