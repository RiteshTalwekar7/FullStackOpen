import { useEffect, useState } from 'react';
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import axios from 'axios';
import phonebook from './services/phonebook';
import Notification from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log('Effect');
    phonebook
      .getAll()
      .then(data => {
        setPersons(data);
      })
  }, [setPersons]);



  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    console.log(event.target.value.toLowerCase());
    setSearchName(event.target.value);
    console.log(persons.filter(person => person.name.toLowerCase().includes(searchName)));
    setFilteredArray(persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())));
  }

  const addInfo = (event) => {
    event.preventDefault();
    const cleanInput = newName.trim().toLowerCase();
    if (persons.some(person => person.name.trim().toLowerCase() === cleanInput)) {
      const personToUpdate = persons.find(person => person.name.trim().toLowerCase() === cleanInput);
      console.log(personToUpdate);
      const newObject = {
        ...personToUpdate,
        number: newNumber
      }
      phonebook
        .update(personToUpdate.id, newObject)
        .then(updatedPerson => {
          console.log(updatedPerson);
          setErrorMsg(`Updated ${updatedPerson.name}`);
          setTimeout(() => {
            setErrorMsg(null);
          }, 3000);
          setPersons(prevPersons => prevPersons.map(person => person.id == updatedPerson.id ? updatedPerson : person));
        })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      phonebook
        .create(newPerson)
        .then(newPerson => {
          console.log(newPerson);
          setErrorMsg(`Added ${newPerson.name}`);
          setTimeout(() => {
            setErrorMsg(null);
          }, 3000)
          setPersons(persons.concat(newPerson));
        })
    }
  }

  return <>
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMsg} />
      <SearchFilter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm addInfo={addInfo} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      {searchName ?
        filteredArray.map(person =>
          <p key={person.name}>{person.name} {person.number}
            <button onClick={() => {
              if (confirm(`Delete ${person.name} ?`)) {
                phonebook
                  .remove(person.id)
                  .then(response => {
                    setErrorMsg(`Deleted ${response.name}`);
                    setTimeout(() => {
                      setErrorMsg(null);
                    }, 3000)
                    setPersons(persons.filter(person => person.name !== response.name));
                  });
              } else {
                alert(`You have cancelled the removal of ${person.name}`)
              }
            }}>delete</button>
          </p>
        ) :
        persons.map(person =>
          <p key={person.name}>{person.name} {person.number}
            <button onClick={() => {
              if (confirm(`Delete ${person.name} ?`)) {
                phonebook
                  .remove(person.id)
                  .then(response => {
                    setErrorMsg(`Deleted ${response.name}`);
                    setTimeout(() => {
                      setErrorMsg(null);
                    }, 3000)
                    setPersons(persons.filter(person => person.name !== response.name));
                  });
              } else {
                alert(`You have cancelled the removal of ${person.name}`)
              }
            }}>delete</button>
          </p>
        )}
    </div>
  </>
}

export default App