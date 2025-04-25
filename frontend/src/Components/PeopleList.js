import React, {useEffect, useState} from 'react';

const PeopleList = ({people, setPeople}) => {
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [sortState, setSortState] = useState("default");

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

    useEffect(() => {
        const getAge = (birthDate) => {
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        };
        if (sortState === "firstNameAZ") {
            const sorted = [...people].sort((a, b) => a.firstName.localeCompare(b.firstName, 'et'));
            setPeople(sorted);
        } else if (sortState === "firstNameZA") {
            const sorted = [...people].sort((a, b) => b.firstName.localeCompare(a.firstName, 'et'));
            setPeople(sorted);
        } else if (sortState === "lastNameAZ") {
            const sorted = [...people].sort((a, b) => a.lastName.localeCompare(b.lastName, 'et'));
            setPeople(sorted);
        } else if (sortState === "lastNameZA") {
            const sorted = [...people].sort((a, b) => b.lastName.localeCompare(a.lastName, 'et'));
            setPeople(sorted);
        } else if (sortState === "ageAscending") {
            const sorted = [...people].sort((a, b) => getAge(a.birthDate) - getAge(b.birthDate));
            setPeople(sorted);
        } else if (sortState === "ageDescending") {
            const sorted = [...people].sort((a, b) => getAge(b.birthDate) - getAge(a.birthDate));
            setPeople(sorted);
        } else if (sortState === "default") {
            fetch("http://localhost:8080/people")
                .then(response => response.json())
                .then(json => setPeople(json));
        }
    }, [sortState]);


    return (
        <div className="md:w-full md:max-w-xl md:mx-auto">
            <div className="text-3xl font-bold mb-4 text-gray-800">Isikute nimekiri</div>
            <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
                <option value="default">Järjesta</option>
                <option value="firstNameAZ">Eesnime järgi A-Z</option>
                <option value="firstNameZA">Eesnime järgi Z-A</option>
                <option value="lastNameAZ">Perenime järgi A-Z</option>
                <option value="lastNameZA">Perenime järgi Z-A</option>
                <option value="ageDescending">Vanus alates vanemast</option>
                <option value="ageAscending">Vanus alates nooremast</option>
            </select>
            {people.map((person, index) => (
                <div key={person.id}>
                    {editId === person.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 md:w-[180px]">
                            <div className="input-field">
                                <label className="input-label">Eesnimi</label>
                                <input className="input-box" name="firstName" value={editData.firstName}
                                       onChange={handleEditChange} />
                            </div>
                            <div className="input-field">
                                <label className="input-label">Perekonnanimi</label>
                                <input className="input-box" name="lastName" value={editData.lastName}
                                       onChange={handleEditChange} />
                            </div>
                            <div className="input-field">
                                <label className="input-label">Sünnikuupäev</label>
                                <input className="input-box" type="date" name="birthDate"
                                       value={editData.birthDate} onChange={handleEditChange} />
                            </div>

                            <div className="input-field">
                                <label className="input-label">Email</label>
                                <input className="input-box" name="email" value={editData.email}
                                       onChange={handleEditChange} />
                            </div>
                            <div className="input-field">
                                <label className="input-label">Telefon</label>
                                <input className="input-box" name="phone" value={editData.phone}
                                       onChange={handleEditChange} />
                            </div>
                            <div className="input-field">
                                <label className="input-label">Aadress</label>
                                <input className="input-box" name="address" value={editData.address}
                                       onChange={handleEditChange} />
                            </div>
                            <div className="col-span-full space-x-2 mt-2">
                                <button className="button-style bg-green-500 hover:bg-green-600"
                                        onClick={() => updatePerson(person.id)}>Salvesta</button>
                                <button className="button-style bg-gray-400 hover:bg-gray-500"
                                        onClick={() => setEditId(null)}>Katkesta</button>
                            </div>
                        </div>
                    ) : (
                        <div className="md:flex md:flex-row py-4 gap-6 md:text-left">
                            <div className="md:w-64">
                                <div className="text-lg font-medium">{person.firstName} {person.lastName}</div>
                                <div className="text-gray-500">
                                    Sünniaeg: {person.birthDate.split("-").reverse().join(".")}
                                </div>
                            </div>
                            <div className="md:w-96">
                                <div className="text-black mt-4 md:mt-0">📧 {person.email}</div>
                                <div className="text-black">📞 {person.phone}</div>
                                <div className="text-black">🏠 {person.address}</div>
                            </div>
                            <div className="button-container">
                                <button className="button-style bg-red-400 hover:bg-red-600 md:mb-2"
                                        onClick={() => deletePerson(person.id)}>Kustuta</button>
                                <button className="button-style bg-indigo-400 hover:bg-indigo-600"
                                        onClick={() => startEdit(person)}>Muuda</button>
                            </div>
                        </div>
                    )}
                    {index !== people.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                </div>
            ))}
        </div>
    )
}

export default PeopleList;