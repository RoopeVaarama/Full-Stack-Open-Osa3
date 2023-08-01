import React from "react";
import personService from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setMessage,
}) => {
  const addNumber = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    console.log(persons.some((person) => person.name === newName));
    const person = persons.find((p) => p.name === newName);
    if (
      person &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const changedPerson = { ...person, number: newNumber };
      personService
        .update(person.id, changedPerson)
        .then((data) => {
          console.log(data);
          setPersons(persons.map((p) => (p.id !== person.id ? p : data)));
        })
        .then(() => {
          setMessage(`Updated ${person.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            setMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          } else {
            setMessage(`Error updating ${person.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        });

      setNewName("");
      setNewNumber("");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((data) => {
          console.log("res", data);
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("err", error.response.data);
          setMessage("Error: " + error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };
  return (
    <form onSubmit={addNumber}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
