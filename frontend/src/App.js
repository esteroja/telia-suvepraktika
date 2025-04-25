import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from "react";
import Navbar from "./Navbar";

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
        .then(json => {setPeople(json);
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            birthDateRef.current.value = "";
            emailRef.current.value = "";
            phoneRef.current.value = "";
            addressRef.current.value = "";
        });
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
      <div>
          <Navbar></Navbar>
          <div className="App min-h-screen bg-white p-6 w-2/3 place-self-center md:pt-10 mt-20">
              <div className="flex md:flex-row justify-between flex-col">
                  <div className="md:w-full md:max-w-xl md:mx-auto">
                      <div className="text-3xl font-bold mb-4 text-gray-800">Isikute nimekiri</div>
                      {people.map((person, index) => (
                          <div key={person.id}>
                              {editId === person.id ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 md:w-[180px]">
                                      <div className="InputField">
                                          <label className="InputLabel">Eesnimi</label>
                                          <input className="InputBox" name="firstName" value={editData.firstName}
                                                 onChange={handleEditChange} />
                                      </div>
                                      <div className="InputField">
                                          <label className="InputLabel">Perekonnanimi</label>
                                          <input className="InputBox" name="lastName" value={editData.lastName}
                                                 onChange={handleEditChange} />
                                      </div>
                                      <div className="InputField">
                                          <label className="InputLabel">Sünnikuupäev</label>
                                          <input className="InputBox" type="date" name="birthDate"
                                                 value={editData.birthDate} onChange={handleEditChange} />
                                      </div>

                                      <div className="InputField">
                                          <label className="InputLabel">Email</label>
                                          <input className="InputBox" name="email" value={editData.email}
                                                 onChange={handleEditChange} />
                                      </div>
                                      <div className="InputField">
                                          <label className="InputLabel">Telefon</label>
                                          <input className="InputBox" name="phone" value={editData.phone}
                                                 onChange={handleEditChange} />
                                      </div>
                                      <div className="InputField">
                                          <label className="InputLabel">Aadress</label>
                                          <input className="InputBox" name="address" value={editData.address}
                                                 onChange={handleEditChange} />
                                      </div>
                                      <div className="col-span-full space-x-2 mt-2">
                                          <button className="ButtonStyle bg-green-500 hover:bg-green-600"
                                                  onClick={() => updatePerson(person.id)}>Salvesta</button>
                                          <button className="ButtonStyle bg-gray-400 hover:bg-gray-500"
                                                  onClick={() => setEditId(null)}>Katkesta</button>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="md:flex md:flex-row py-4 gap-6 text-left">
                                      <div className="md:w-[180px]">
                                          <div className="text-lg font-medium">{person.firstName} {person.lastName}</div>
                                          <div className="text-gray-500">
                                              Sünniaeg: {person.birthDate.split("-").reverse().join(".")}
                                          </div>
                                      </div>
                                      <div>
                                          <div className="text-black mt-4 md:mt-0">📧 {person.email}</div>
                                          <div className="text-black">📞 {person.phone}</div>
                                          <div className="text-black">🏠 {person.address}</div>
                                      </div>
                                      <div className="mt-5 md:m-0 md:flex-col flex place-self-end">
                                          <button className="ButtonStyle bg-red-400 hover:bg-red-600 md:mb-2"
                                                  onClick={() => deletePerson(person.id)}>Kustuta</button>
                                          <button className="ButtonStyle bg-indigo-400 hover:bg-indigo-600"
                                                  onClick={() => startEdit(person)}>Muuda</button>
                                      </div>
                                  </div>
                              )}
                              {index !== people.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                          </div>
                      ))}
                  </div>
                  <div className="bg-purple-200 p-6 rounded-xl max-w-sm md:self-start self-center mt-8 md:mt-0">
                      <div className="text-2xl font-bold mb-4 text-gray-800">Lisa uus isik</div>
                      <div className="">
                          <div className="InputField">
                              <label className="InputLabel">Eesnimi</label>
                              <input className="InputBox" placeholder="eesnimi" ref={firstNameRef}/>
                          </div>
                          <div className="InputField">
                              <label className="InputLabel">Perekonnanimi</label>
                              <input className="InputBox" placeholder="perekonnanimi" ref={lastNameRef}/>
                          </div>
                          <div className="InputField">
                              <label className="InputLabel">Sünnikuupäev</label>
                              <input className="InputBox" type="date" ref={birthDateRef}/>
                          </div>
                          <div className="InputField">
                              <label className="InputLabel">Email</label>
                              <input className="InputBox" type="email" placeholder="email" ref={emailRef}/>
                          </div>
                          <div className="InputField">
                              <label className="InputLabel">Telefon</label>
                              <input className="InputBox" placeholder="telefon" ref={phoneRef}/>
                          </div>
                          <div className="InputField">
                              <label className="InputLabel">Aadress</label>
                              <input className="InputBox" placeholder="aadress" ref={addressRef}/>
                          </div>
                      </div>
                      <div className="mt-4">
                          <button className="ButtonStyle bg-indigo-400 hover:bg-indigo-600"
                                  onClick={addPerson}>Lisa</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
