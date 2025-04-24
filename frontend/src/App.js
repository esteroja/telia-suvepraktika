import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
  const [people, setPeople] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDateRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  useEffect(()=>{
    fetch("http://localhost:8080/people")
        .then(response => response.json())
        .then(json => {setPeople(json)})
  }, []);

  function addPeople() {
    const newPerson = {
      "firstName": firstNameRef.current.value,
      "lastName": lastNameRef.current.value,
      "birthDate": birthDateRef.current.value,
      "email": emailRef.current.value,
      "phone": phoneRef.current.value,
      "address": addressRef.current.value,

    }

    fetch("http://localhost:8080/people",
        {
          "method": "POST",
          "body": JSON.stringify(newPerson),
          "headers": {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(json => {setPeople(json)});
  }

  function deletePerson(id){
    fetch("http://localhost:8080/people/" + id, {"method": "DELETE"})
        .then(response => response.json())
        .then(json => {setPeople(json)})
  }

  function startEdit(person) {
    setEditId(person.id);
    setEditData(person);
  }

  function updatePerson(id){
    fetch("http://localhost:8080/people/update/" + id,
        {
          "method": "PUT",
          "body": JSON.stringify(editData)
        })
        .then(response => response.json())
        .then(json => {
          setPeople(json);
          setEditId(null);
          setEditData({});
        })
  }

  return (
    <div className="App">

      <header className="App-header">


      </header>
    </div>
  );
}

export default App;
