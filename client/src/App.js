import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((data) => {
      console.log("promise fulfilled", data);
      setPersons(data);
    });
  }, []);
  console.log("render", persons, "notes");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter search={search} setSearch={setSearch} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
