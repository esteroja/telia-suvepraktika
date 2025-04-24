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

  function addPerson() {
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

  function handleEditChange(event) {
    const {name, value} = event.target;
    setEditData(prev => ({...prev, [name]: value}));
  }

  function updatePerson(id){
    fetch("http://localhost:8080/people/update/" + id,
        {
          "method": "PUT",
          "body": JSON.stringify(editData),
          "headers": {"Content-Type": "application/json"}
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
        <h1>People Manager</h1>

        <div>
          <h2>Add New Person</h2>
          <input placeholder="First Name" ref={firstNameRef} />
          <input placeholder="Last Name" ref={lastNameRef} />
          <input type="date" ref={birthDateRef} />
          <input placeholder="Email" ref={emailRef} />
          <input placeholder="Phone" ref={phoneRef} />
          <input placeholder="Address" ref={addressRef} />
          <button onClick={addPerson}>Add</button>
        </div>

        <div>
          <h2>People List</h2>
          {people.map(person => (
              <div key={person.id}>
                {editId === person.id ? (
                    <>
                      <input name="firstName" value={editData.firstName} onChange={handleEditChange} />
                      <input name="lastName" value={editData.lastName} onChange={handleEditChange} />
                      <input type="date" name="birthDate" value={editData.birthDate} onChange={handleEditChange} />
                      <input name="email" value={editData.email} onChange={handleEditChange} />
                      <input name="phone" value={editData.phone} onChange={handleEditChange} />
                      <input name="address" value={editData.address} onChange={handleEditChange} />
                      <button onClick={() => updatePerson(person.id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                      <p>{person.firstName} {person.lastName} (Born: {person.birthDate})</p>
                      <p>Email: {person.email}, Phone: {person.phone}</p>
                      <p>Address: {person.address}</p>
                      <button onClick={() => startEdit(person)}>Edit</button>
                      <button onClick={() => deletePerson(person.id)}>Delete</button>
                    </>
                )}
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
