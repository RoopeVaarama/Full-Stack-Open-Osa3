import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from "./components/Notification";
import './App.css';

const App = () => {
    const [persons, setPersons] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService.getAll().then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        })
    }, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification errorMessage={errorMessage} message={message} />

            <Filter search={search} setSearch={setSearch} />

            <h3>add a new</h3>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setMessage={setMessage} />


            <h2>Numbers</h2>
            <Persons persons={persons} search={search} setPersons={setPersons} setErrorMessage={setErrorMessage} />
        </div>
    )

}

export default App