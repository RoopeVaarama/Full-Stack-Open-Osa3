import React from 'react';
import personService from '../services/persons';

const Persons = ({ persons, search, setPersons, setErrorMessage }) => {

    return persons
        .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => {
            return <div key={person.name}>
                {person.name} {person.number}
                <button onClick={() => {
                    if (window.confirm(`Delete ${person.name}?`)) {
                        personService.remove(person.id).catch(error => {
                            setErrorMessage(
                                `Person '${person.name}' was already removed from server`
                            )
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                        })
                        setPersons(persons.filter(p => p.id !== person.id))
                    }
                }
                }>delete</button>
            </div>
        })
}

export default Persons;