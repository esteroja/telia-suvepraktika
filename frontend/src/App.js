import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Navbar from "./Components/Navbar";
import PeopleList from "./Components/PeopleList";
import AddPerson from "./Components/AddPerson";

function App() {
    const [people, setPeople] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/people")
        .then(response => response.json())
        .then(json => {setPeople(json)})
  }, []);

  return (
      <div>
          <Navbar />
          <div className="App min-h-screen bg-white p-6 w-2/3 place-self-center md:pt-10 mt-20">
              <div className="flex md:flex-row justify-between flex-col">
                  <PeopleList people={people} setPeople={setPeople} />
                  <AddPerson setPeople={setPeople} />
              </div>
          </div>
      </div>
  );
}

export default App;
