import React, {useEffect, useRef, useState} from 'react';
import Fuse from "fuse.js";

const SortSearch = ({people, setPeople}) => {
    const [sortState, setSortState] = useState("default");

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
                .then(json => {setPeople(json)});
        }
    }, [sortState]);

    const handleSearch = (query) => {
        if (!query.trim()) {
            fetch("http://localhost:8080/people")
                .then(res => res.json())
                .then(json => {setPeople(json)});
            return;
        }
        const options = {
            keys: ['firstName', 'lastName'],
            threshold: 0.3,
        };
        const fuse = new Fuse(people, options);
        const results = fuse.search(query);
        const matchedPeople = results.map(result => result.item);
        const unmatchedPeople = people.filter(p => !matchedPeople.includes(p));
        setPeople([...matchedPeople, ...unmatchedPeople]);
    };

    return (
        <div className="flex md:flex-row flex-col md:justify-between w-full">
            <input
                type="text"
                placeholder="Otsi nime järgi..."
                className="input-box md:mt-0 w-full mb-4"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <select defaultValue={'default'}
                    onChange={(e) => setSortState(e.target.value)}
                    className="input-box my-4 w-full">
                <option value="default">Järjesta</option>
                <option value="firstNameAZ">Eesnime järgi A-Z</option>
                <option value="firstNameZA">Eesnime järgi Z-A</option>
                <option value="lastNameAZ">Perenime järgi A-Z</option>
                <option value="lastNameZA">Perenime järgi Z-A</option>
                <option value="ageDescending">Vanus alates vanemast</option>
                <option value="ageAscending">Vanus alates nooremast</option>
            </select>
        </div>
    );

}

export default SortSearch;